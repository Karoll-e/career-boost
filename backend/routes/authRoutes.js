const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, uploadUserAvatar } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();
console.log("upload.single:", typeof upload.single);

// Auth Routes
router.post("/register", registerUser);   // Register User
router.post("/login", loginUser);         // Login User
router.get("/profile", protect, getUserProfile);  // Get User Profile
router.put("/update-profile", protect, updateUserProfile);  // Update User Profile
router.post("/upload-avatar", protect, upload.single("avatar"), uploadUserAvatar);  // Upload User Avatar

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

module.exports = router;
