"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var priceSchema = new mongoose_1.default.Schema({
    gold: {
        type: Number,
        required: true,
    },
    goldChange: Number,
    silver: {
        type: Number,
        required: true,
    },
    silverChange: Number,
    platinum: {
        type: Number,
        required: true,
    },
    platinumChange: Number,
    palladium: {
        type: Number,
        required: true,
    },
    palladiumChange: Number,
});
var Prices = mongoose_1.default.model("Prices", priceSchema);
exports.default = Prices;
