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
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: JSON parsing middleware MUST come before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for form data

// Connect to database (can be before or after middleware)
connectDB()

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions', questionRoutes);

// Debug route - list all resumes (remove in production)
app.get('/api/resume/debug/all', async (req, res) => {
  try {
    const Resume = require('./models/Resume');
    const resumes = await Resume.find({}).populate('userId', 'name email');
    res.json({ count: resumes.length, resumes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/resume', resumeRoutes);

app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));