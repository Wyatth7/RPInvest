import path from "path";
import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import updatePrices from "./utils/updatePrices";

const app = express();

app.use(express.static(path.join(__dirname, "./../../build")));
app.use(express.json());

updatePrices();

app.use("/api/v1/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "./../../build", "index.html"));
});

export default app;
