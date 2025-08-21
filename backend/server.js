require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const questionRoutes = require('./routes/questionRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const { protect } = require("./middlewares/authMiddleware");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

const app = express();

// Middleware to handle CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow localhost
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // In production, allow specific origins
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'https://career-boost-frontend.vercel.app',
      'https://career-boost.vercel.app'
    ].filter(Boolean); // Remove undefined values
    
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// IMPORTANT: JSON parsing middleware MUST come before routes
app.use(express.json({ limit: '10mb' })); // Increase limit for file uploads
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Add this for form data

// Connect to database (can be before or after middleware)
connectDB();

// Health check route (useful for monitoring)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

// Debug route - list all resumes (remove in production)
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/resume/debug/all', async (req, res) => {
    try {
      const Resume = require('./models/Resume');
      const resumes = await Resume.find({}).populate('userId', 'name email');
      res.json({ count: resumes.length, resumes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
}

app.use('/api/resume', resumeRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: '1d', // Cache for 1 day
  etag: true
}));

// Catch-all route for undefined API routes
app.get('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API route not found',
    path: req.path,
    method: req.method
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Career Boost API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      sessions: '/api/sessions',
      questions: '/api/questions',
      resume: '/api/resume',
      ai: '/api/ai',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// For Vercel deployment, export the app instead of listening
if (process.env.NODE_ENV === 'production') {
  module.exports = app;
} else {
  // Start Server locally
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}