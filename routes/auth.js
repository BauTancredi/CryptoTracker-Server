// Routes for authenticate users
const express = require("express");

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// Authenticate user
// api/auth
router.post("/", authController.authenticateUser);

// Obtains authenticated user
router.get("/", auth, authController.authenticatedUser);

module.exports = router;
