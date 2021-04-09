import path from "path";
import schedule from "node-schedule";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: path.resolve(__dirname, "./../../config.env") });

import Prices from "../models/prices";

interface IMetalAPI {
  USD: number;
  XAG: number;
  XAU: number;
  XPT: number;
  XPD: number;
}

const updatePrices = async () => {
  schedule.scheduleJob("* */15 * * *", async () => {
    // Get previous prices from database
    const prices = await Prices.findById("606cf5eefaaaa947c45b546e");

    if (!prices) {
      return;
    }

    // Get new price data from metals-api
    const metalsApi = await axios.get(
      `https://metals-api.com/api/latest?access_key=${process.env.METALS_API_KEY}&base=USD&symbols=XAU,XAG,XPT,XPD`
    );

    // Format metal price data into readable number
    const metalPrices = createMetalsPriceObject(metalsApi.data.rates);

    // Update metal prices in db
    try {
      await Prices.findByIdAndUpdate("606cf5eefaaaa947c45b546e", {
        $set: {
          gold: metalPrices.gold,
          silver: metalPrices.silver,
          platinum: metalPrices.platinum,
          palladium: metalPrices.palladium,
          goldChange: calcChange(prices.gold, metalPrices.gold),
          silverChange: calcChange(prices.silver, metalPrices.silver),
          platinumChange: calcChange(prices.platinum, metalPrices.platinum),
          palladiumChange: calcChange(prices.palladium, metalPrices.palladium),
        },
      });
    } catch (err) {
      console.log("Could not update prices.");
    }
  });
};

/**
 * Calculates the change of the new price of the metals-api with the
 * price that is stored in the db, then, fixes the number to 2 decimal places.
 * @param oldPrice Price stored in db
 * @param newPrice Price from metals-api
 * @returns Formatted price
 */
const calcChange = (oldPrice: number, newPrice: number) => {
  if (oldPrice > newPrice) {
    return roundToTwo((oldPrice - newPrice) * -1, 2);
  } else if (newPrice > oldPrice) {
    return roundToTwo(newPrice - oldPrice, 2);
  } else {
    return roundToTwo(newPrice, 2);
  }
};

/**
 * Formats price from decimal to proper price
 * @param apiPrice Price to be formatted
 * @returns Formatted price
 */
const getCorrectPrice = (apiPrice: number) => {
  return roundToTwo(1 / apiPrice, 2);
};

/**
 * Formats rates object from metal-api into an easily readable object.
 * @param apiPrice Rates from metal-api
 * @returns Formatted price data
 */
const createMetalsPriceObject = (apiPrice: IMetalAPI) => {
  return {
    USD: getCorrectPrice(apiPrice.USD),
    gold: getCorrectPrice(apiPrice.XAU),
    silver: getCorrectPrice(apiPrice.XAG),
    platinum: getCorrectPrice(apiPrice.XPT),
    palladium: getCorrectPrice(apiPrice.XPD),
  };
};

/**
 * Formats a number to the specified number of integers after a decimal
 * @param n Number to be rounded
 * @param fixed Amount of integers allowed after decimal point
 * @returns Formatted number to the amount of integers after a decimal point
 */
const roundToTwo = (n: number, fixed: number) =>
  ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);

/**
 * Creates new prices db item
 */
const createObject = async () => {
  await Prices.create({
    gold: 0,
    silver: 0,
    platinum: 0,
    palladium: 0,
    goldChange: 0,
    silverChange: 0,
    platinumChange: 0,
    palladiumChange: 0,
  });
};

export default updatePrices;
