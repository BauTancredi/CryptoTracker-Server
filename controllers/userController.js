const User = require("../models/User");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: "The user already exists" });

    // Create new user
    let user = new User(req.body);

    await user.save();
  } catch (error) {
    console.log(error);
  }
};
