import path from "path";
import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import updatePrices from "./utils/updatePrices";

const app = express();

app.use(express.static(path.join(__dirname, "./../../build")));
app.use(express.json());

// BE CAREFUL WHEN UPDATING THIS FILE. WILL CORRUPT AND CAUSE ERRORS IN THE JS FORMAT.
// updatePrices();

app.use("/api/v1/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "./../../build", "index.html"));
});

export default app;
