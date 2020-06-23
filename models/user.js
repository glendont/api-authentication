const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a Schema
const userSchema = new Schema({
  email: String,
  password: String,
});

// Create a model
// Argument = name (in singular)
// Model
const User = mongoose.model("user", userSchema);

// Export the model
module.exports = User;
