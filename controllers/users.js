const User = require("../models/user");

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Email & Password
    console.log(`contents of req.value.body`, req.value.body);

    // Check if there is an existing user with the same email
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    /// Respond with Token
    res.json({ user: `Created` });
  },
  signIn: async (req, res, next) => {
    // Generate Token
    console.log(`UsersController.signIn() called!`);
  },

  secret: async (req, res, next) => {
    console.log(`UsersController.secret() called!`);
  },
};
