const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Auth Service Database Connected");
});

app.use("/api/auth", userRouter);

app.listen(PORT, () => console.log(`Auth Service running at port ${PORT}`));
