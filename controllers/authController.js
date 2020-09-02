const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    // Verify user exists
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "The user does not exists" });

    // Verify password
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ msg: "Incorrect password" });

    // Create JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        // Confirmation message
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Obtains authenticated user

exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "There has been an error" });
  }
};
