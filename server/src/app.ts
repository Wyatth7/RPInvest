import path from "path";
import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import contactRoutes from "./routes/contact";
import updatePrices from "./utils/updatePrices";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import compression from "compression";

const app = express();

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/", limiter);

app.use(express.static(path.join(__dirname, "./../../build")));
app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(
  hpp({
    whitelist: ["duration"],
  })
);

// BE CAREFUL WHEN UPDATING THIS FILE. WILL CORRUPT AND CAUSE ERRORS IN THE JS FORMAT.
updatePrices();

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/contact", contactRoutes);

app.use(compression());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "./../../build", "index.html"));
});

export default app;
