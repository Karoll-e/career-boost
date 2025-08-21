require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes')
const sessionRoutes = require('./routes/sessionRoutes')
const questionRoutes = require('./routes/questionRoutes');
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

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: '1d', // Cache for 1 day
  etag: true
}));

// ✅ Catch-all route for undefined API routes (corregido)
app.get('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// R
