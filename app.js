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
// Init localhost
const fs = require("fs");
// const key = fs.readFileSync("./rootCA.pem");
// const cert = fs.readFileSync("./rootCA.key");
// const https = require("https");
// init express app
const app = express();
// const server = https.createServer({ key: key, cert: cert }, app);

// https.createServer(ssl, app).listen(3000);

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
