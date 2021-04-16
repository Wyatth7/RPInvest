"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var user = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        default: 0,
    },
    silver: {
        type: Number,
        default: 0,
    },
    gold: {
        type: Number,
        default: 0,
    },
    platinum: {
        type: Number,
        default: 0,
    },
    palladium: {
        type: Number,
        default: 0,
    },
    commodities: [
        {
            title: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                enum: ["silver", "gold", "platinum", "palladium"],
                reuired: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            change: {
                type: Number,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            increase: {
                type: String,
                required: true,
            },
        },
    ],
});
var User = mongoose_1.default.model("User", user);
exports.default = User;
