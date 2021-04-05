import { RequestHandler } from "express";
import admin from "../utils/firebase-services";
import User from "./../models/user";

// HELPER FUNCTIONS
import sendRes from "./../utils/sendRes";
import getUserEmail from "./../utils/getUserEmail";

export const addCommodity: RequestHandler = async (req, res, next) => {
  const reqData = req.body;
  console.log("herre");

  const date = new Date().toLocaleDateString();

  try {
    await User.findOneAndUpdate(
      { email: reqData.email },
      {
        $push: {
          commodities: {
            title: reqData.title,
            type: reqData.type,
            amount: reqData.amount,
            date: date,
            change: 0,
            increase: false,
          },
        },
      }
    );
    res.status(200).json({ message: "Commodity added" });
  } catch (err) {
    console.log(err);
    sendRes(
      res,
      400,
      "Could not create commodity item, refresh the page or try again later."
    );
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  const data = req.body;
  console.log(data);

  if (data.cofPass !== data.pass) {
    return sendRes(res, 400, "Confirm password does not match password.");
  }

  try {
    const user = await admin.auth().createUser({
      email: data.email,
      password: data.pass,
    });

    await User.create({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
    });

    res.status(200).json({ message: "User created." });
  } catch (err) {
    console.log(err);
    return sendRes(res, 400, "Could not create user");
  }
};

export const editCommodity: RequestHandler = async (req, res, next) => {
  try {
    // getting array element from client, now need to
    // query commodity items for the object with the
    // matching id.
    await User.findOneAndUpdate(
      { email: req.rawHeaders[getUserEmail(req.rawHeaders)] },
      {
        $set: {
          "commodities.$.title": req.body.title,
          "commodities.$.amount": req.body.amount,
        },
      }
    );
  } catch (err) {
    console.log(err);
    sendRes(res, 400, "Could not edit commodity tab.");
  }
};

export const getUserData: RequestHandler = async (req, res, next) => {
  try {
    const userData = await User.findOne({
      email: req.rawHeaders[getUserEmail(req.rawHeaders)],
    });
    res.status(200).json({
      userData: userData,
    });
  } catch (err) {
    console.log(err);
    return sendRes(res, 400, "Could not get user data.");
  }
};
