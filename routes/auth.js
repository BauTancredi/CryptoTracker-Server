// Routes for authenticate users
const express = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/authController");
// const auth = require("../middleware/auth");

const router = express.Router();

// Authenticate user
// api/auth
router.post(
  "/",
  check("email", "The email format is not valid").isEmail(),
  authController.authenticateUser
);

// Obtains authenticated user
// router.get("/", auth, authController.authenticatedUser);

module.exports = router;
