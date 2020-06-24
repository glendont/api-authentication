const JWT = require("jsonwebtoken");
const User = require("../models/user");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "Authenticator",
      sub: user.id, // Unique ID of the user
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1), // Expiry Date = Current Time + 1 Day ahead
    },
    "authentication"
  );
};
module.exports = {
  // METHOD SIGN UP FOR AN ACCOUNT
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    // Email & Password
    console.log(`contents of req.value.body`, req.value.body);

    // Check if there is an existing user with the same email
    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    // Create a new user
    const newUser = new User({
      method: "local",
      local: {
        email: email,
        password: password,
      },
    });

    await newUser.save();

    // Generate the Token
    const token = signToken(newUser);

    /// Respond to Client with Token
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate Token

    const token = signToken(req.user);

    console.log("Successful Login");
    res.status(200).json({ token });
  },

  googleOAuth: async (req, res, next) => {
    // Generate Token
    console.log("req.user", req.user);
    const token = signToken(req.user);

    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    console.log(`UsersController.secret() called!`);
    res.json({ secret: "secret resource" });
  },
};
