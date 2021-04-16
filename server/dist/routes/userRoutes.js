"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var checkAuth_1 = require("../utils/checkAuth");
var userController = __importStar(require("./../controllers/userController"));
var router = express_1.default.Router();
router.patch("/addCommodity", checkAuth_1.checkIfAuthenticated, userController.addCommodity);
router.post("/create", userController.createUser);
router.get("/dashboardData", checkAuth_1.checkIfAuthenticated, userController.getUserData);
router.patch("/editCommodity", checkAuth_1.checkIfAuthenticated, userController.editCommodity);
router.patch("/deleteCommodity", checkAuth_1.checkIfAuthenticated, userController.deleteCommodity);
router.get("/priceData", userController.getPriceData);
router.get("/queryCommodities/:string", checkAuth_1.checkIfAuthenticated, userController.queryCommodities);
exports.default = router;
