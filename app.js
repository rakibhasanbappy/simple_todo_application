const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

dotenv.config();

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://localhost/todos") // connection string of mongodb
  .then(() => console.log("Connection Successful!"))
  .catch((err) => console.log(err));

// application routes
app.use("/todo", todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(process.env.PORT, () => {
  console.log(`app listening at port ${process.env.port}`);
});
