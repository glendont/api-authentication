// Packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Init mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/APIAuthentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// init express app
const app = express();

app.use(cors());
// Middlewares
if (!process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
}
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);
