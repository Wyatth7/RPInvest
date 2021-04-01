import path from "path";
import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const db = process.env.DATABASE?.replace(
  "<PASSWORD>",
  `${process.env.PASSWORD}`
);

mongoose
  .connect(`${db}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((err) => console.log("Connected to database"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
