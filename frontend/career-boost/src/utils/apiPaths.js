// Environment-based API URL configuration
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? "http://localhost:8000" : import.meta.env.VITE_API_BASE_URL);

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Signup
    LOGIN: "/api/auth/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/auth/profile", // Get logged-in user details
  },

  USER: {
    UPDATE_PROFILE: "/api/auth/update-profile", // Update user profile
    UPLOAD_AVATAR: "/api/auth/upload-avatar", // Upload profile picture
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate interview questions and answers using Gemini
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Generate concept explanation using Gemini
  },

  SESSION: {
    CREATE: "/api/sessions/create", // Create a new interview session with questions
    LIST: "/api/sessions/my-sessions", //  Get all user sessions
    GET_ALL: "/api/sessions/my-sessions", //  Get all user sessions
    GET_ONE: (id) => `/api/sessions/${id}`, // Get session details with questions
    UPDATE: (id) => `/api/sessions/${id}`, // Update a session
    DELETE: (id) => `/api/sessions/${id}`, // Delete a session
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // Add more questions to a session
    PIN: (id) => `/api/questions/${id}/pin`, // Pin or Unpin a question
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Update/Add a note to a question
    REVIEW: (id) => `/api/questions/${id}/review`, // Mark or unmark a question as reviewed
  },
};
