import { RequestHandler } from "express";
import Message from "../models/contact";
import sendRes from "../utils/sendRes";

export const createMessage: RequestHandler = async (req, res, next) => {
  try {
    const bodyData = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      message: req.body.message,
    };

    await Message.create(bodyData);
    res.status(201).json({ message: "Message sent." });
  } catch (err) {
    console.log(err);
    sendRes(res, 400, "Could not send message.");
  }
};
