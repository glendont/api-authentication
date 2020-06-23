const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// Create a Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Mongoose functionality which allows us to run a function before something happens.
userSchema.pre("save", async function (next) {
  // In this, we want this function to run before the userschema is saved
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash password with salt
    const passwordHash = await bcrypt.hash(this.password, salt);
    // Store hashed password instead of original password
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (enterPassword) {
  try {
    const passwordMatch = await bcrypt.compare(enterPassword, this.password);
    return passwordMatch; // True if matches
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model
// Argument = name (in singular)
// Model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
