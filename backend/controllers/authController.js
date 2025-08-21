const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    // Add logging to debug the issue
    console.log('Request body:', req.body);
    console.log('Content-Type:', req.get('Content-Type'));

    // Check if req.body exists and has required fields
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { name, email, password, profileImageUrl } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Missing required fields: name, email, and password are required" 
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    // Return user data with JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    // Add logging to debug the issue
    console.log('Login request body:', req.body);

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" }); // Changed from 500 to 401
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" }); // Changed from 500 to 401
    }

    // Return user data with JWT
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (Requires JWT)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/update-profile
// @access  Private (Requires JWT)
const updateUserProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ 
        message: "Name and email are required" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Please enter a valid email address" 
      });
    }

    // Check if email is already taken by another user
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name.trim(),
        email: email.trim(),
        profileImageUrl: avatar || req.user.profileImageUrl
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.profileImageUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Upload user avatar
// @route   POST /api/auth/upload-avatar
// @access  Private (Requires JWT)
const uploadUserAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Create the full URL for the uploaded image
    const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // Update user's profile image URL in the database
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImageUrl: avatarUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Avatar uploaded successfully",
      avatarUrl: avatarUrl,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.profileImageUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, uploadUserAvatar };