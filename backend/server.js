const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./routes/taskRoutes")

const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.CONNECTION_DB)
  .then(() => console.log("Connection Successfully"))
  .catch((err) => console.log(err));

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server Started at port: ${port}`);
});


module.exports = app;
