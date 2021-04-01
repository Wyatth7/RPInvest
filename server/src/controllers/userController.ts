import { RequestHandler } from "express";
import sendRes from "./../utils/sendRes";
import admin from "../utils/firebase-services";
import User from "./../models/user";

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
      name: data.firstname,
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
