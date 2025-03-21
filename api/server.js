const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({ path: "./config.env" });

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Mongo DB Connected Successfully"));

app.listen(process.env.PORT, () => {
  console.log(`Listening server at port: ${process.env.PORT}`);
});
