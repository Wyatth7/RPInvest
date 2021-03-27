import path from "path";
import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
