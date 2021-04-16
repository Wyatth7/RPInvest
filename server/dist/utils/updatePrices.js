"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var node_schedule_1 = __importDefault(require("node-schedule"));
var dotenv_1 = __importDefault(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "./../../config.env") });
var prices_1 = __importDefault(require("../models/prices"));
var updatePrices = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        node_schedule_1.default.scheduleJob("0 */15 * * *", function () { return __awaiter(void 0, void 0, void 0, function () {
            var prices, metalsApi, metalPrices, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, prices_1.default.findById("606cf5eefaaaa947c45b546e")];
                    case 1:
                        prices = _a.sent();
                        if (!prices) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, axios_1.default.get("https://metals-api.com/api/latest?access_key=" + process.env.METALS_API_KEY + "&base=USD&symbols=XAU,XAG,XPT,XPD")];
                    case 2:
                        metalsApi = _a.sent();
                        metalPrices = createMetalsPriceObject(metalsApi.data.rates);
                        return [4 /*yield*/, prices_1.default.findByIdAndUpdate("606cf5eefaaaa947c45b546e", {
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
                            })];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log("Could not update prices.");
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
/**
 * Calculates the change of the new price of the metals-api with the
 * price that is stored in the db, then, fixes the number to 2 decimal places.
 * @param oldPrice Price stored in db
 * @param newPrice Price from metals-api
 * @returns Formatted price
 */
var calcChange = function (oldPrice, newPrice) {
    if (oldPrice > newPrice) {
        return roundToTwo((oldPrice - newPrice) * -1, 2);
    }
    else if (newPrice > oldPrice) {
        return roundToTwo(newPrice - oldPrice, 2);
    }
    else {
        return roundToTwo(newPrice, 2);
    }
};
/**
 * Formats price from decimal to proper price
 * @param apiPrice Price to be formatted
 * @returns Formatted price
 */
var getCorrectPrice = function (apiPrice) {
    return roundToTwo(1 / apiPrice, 2);
};
/**
 * Formats rates object from metal-api into an easily readable object.
 * @param apiPrice Rates from metal-api
 * @returns Formatted price data
 */
var createMetalsPriceObject = function (apiPrice) {
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
var roundToTwo = function (n, fixed) {
    return ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
};
/**
 * Creates new prices db item
 */
// const createObject = async () => {
//   await Prices.create({
//     gold: 0,
//     silver: 0,
//     platinum: 0,
//     palladium: 0,
//     goldChange: 0,
//     silverChange: 0,
//     platinumChange: 0,
//     palladiumChange: 0,
//   });
// };
exports.default = updatePrices;
