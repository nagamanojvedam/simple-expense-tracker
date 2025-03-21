const express = require("express");
const cors = require("cors");

const userRouter = require("./routers/userRouter");
const transactionRouter = require("./routers/transactionRouter");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cors());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);

module.exports = app;
