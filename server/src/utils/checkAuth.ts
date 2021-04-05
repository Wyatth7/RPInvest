import { NextFunction, Request, RequestHandler, Response } from "express";
import admin from "./firebase-services";
import sendRes from "./sendRes";

const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authtoken = req.headers.authorization.split(" ")[1];
  } else {
    req.authtoken = "";
  }
  next();
};

export const checkIfAuthenticated: RequestHandler = async (req, res, next) => {
  getAuthToken(req, res, async () => {
    const { authtoken } = req;

    try {
      const userInfo = await admin.auth().verifyIdToken(authtoken);

      console.log("here");
      if (!userInfo) {
        req.authtoken = "";
        return next(new Error("You are not logged in, please sign in"));
      }

      return next();
    } catch (err) {
      res.status(403).json({ message: "Could not authenticate user." });
    }
  });
};
