import { RequestHandler } from "express";
import admin from "../utils/firebase-services";

// DATABASE
import User from "./../models/user";
import Prices from "./../models/prices";

// HELPER FUNCTIONS
import sendRes from "./../utils/sendRes";
import getUserEmail from "./../utils/getUserEmail";

export const addCommodity: RequestHandler = async (req, res, next) => {
  const reqData = req.body;

  const date = new Date().toLocaleDateString();

  try {
    // let setter = {$set: {}};
    // setter.$set[`${reqData.type}.`] = false;

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
        $inc: {
          total: reqData.amount,
          [`${reqData.type}`]: reqData.amount,
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

export const deleteCommodity: RequestHandler = async (req, res, next) => {
  try {
    const deleteData = await User.findOne({
      email: req.rawHeaders[getUserEmail(req.rawHeaders)],
      "commodities._id": req.body.id,
    });

    if (!deleteData) {
      return sendRes(res, 400, "Could not ...");
    }

    const amount = deleteData.commodities
      .map((el: any) => {
        if (el._id.toString() === req.body.id) {
          return el.amount;
        } else {
          return -1;
        }
      })
      .filter((el) => el !== -1);

    await User.findOneAndUpdate(
      {
        email: req.rawHeaders[getUserEmail(req.rawHeaders)],
      },
      {
        $inc: {
          total: -parseInt(amount[0]),
          [`${req.body.type}`]: -parseInt(amount[0]),
        },
        $pull: {
          commodities: {
            _id: req.body.id,
          },
        },
      }
    );

    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
    sendRes(res, 400, "Could not edit commodity tab.");
  }
};

export const editCommodity: RequestHandler = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      {
        email: req.rawHeaders[getUserEmail(req.rawHeaders)],
        "commodities._id": req.body.id,
      },
      {
        $set: {
          "commodities.$.title": req.body.title,
        },
        $inc: {
          total: req.body.amount,
          [`${req.body.type}`]: req.body.amount,
          "commodities.$.amount": req.body.amount,
        },
      }
    );

    res.status(200).json({ message: "Commodity edited" });
  } catch (err) {
    console.log(err);
    sendRes(res, 400, "Could not edit commodity tab.");
  }
};

export const getPriceData: RequestHandler = async (req, res, next) => {
  try {
    const priceData = await Prices.findById("606cf5eefaaaa947c45b546e");

    res.status(200).json(priceData);
  } catch (err) {
    return sendRes(res, 400, "Could not get metal prices.");
  }
};

export const getUserData: RequestHandler = async (req, res, next) => {
  try {
    // const priceData = await Prices.findById("606cf5eefaaaa947c45b546e");

    const userData = await User.findOne({
      email: req.rawHeaders[getUserEmail(req.rawHeaders)],
    });
    res.status(200).json({
      userData,
      // priceData,
    });
  } catch (err) {
    console.log(err);
    return sendRes(res, 400, "Could not get user data.");
  }
};

export const queryCommodities: RequestHandler = async (req, res, next) => {
  try {
    if (req.params.string === "") {
      const commodities = await User.findOne({
        email: req.rawHeaders[getUserEmail(req.rawHeaders)],
      });
      return res.status(200).json(commodities?.commodities);
    }

    const commodities = await User.findOne({
      email: req.rawHeaders[getUserEmail(req.rawHeaders)],
      "commodities.title": { $regex: req.params.string },
    });

    const arr = commodities?.commodities
      .map((el) =>
        el.title.toLowerCase().includes(req.params.string) ? el : null
      )
      .filter((el) => el !== null);

    res.status(200).json({ userData: arr });
  } catch (err) {
    console.log(err);
    return sendRes(res, 400, "Could not find commodity with that name");
  }
};
