const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "The name is mandatory").not().isEmpty(),
    check("email", "Please add a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ],
  userController.createUser
);

module.exports = router;
