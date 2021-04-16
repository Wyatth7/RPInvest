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
exports.queryCommodities = exports.getUserData = exports.getPriceData = exports.editCommodity = exports.deleteCommodity = exports.createUser = exports.addCommodity = void 0;
var firebase_services_1 = __importDefault(require("../utils/firebase-services"));
// DATABASE
var user_1 = __importDefault(require("./../models/user"));
var prices_1 = __importDefault(require("./../models/prices"));
// HELPER FUNCTIONS
var sendRes_1 = __importDefault(require("./../utils/sendRes"));
var getUserEmail_1 = __importDefault(require("./../utils/getUserEmail"));
var addCommodity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqData, date, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                reqData = req.body;
                date = new Date().toLocaleDateString();
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                // let setter = {$set: {}};
                // setter.$set[`${reqData.type}.`] = false;
                return [4 /*yield*/, user_1.default.findOneAndUpdate({ email: reqData.email }, {
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
                        $inc: (_a = {
                                total: reqData.amount
                            },
                            _a["" + reqData.type] = reqData.amount,
                            _a),
                    })];
            case 2:
                // let setter = {$set: {}};
                // setter.$set[`${reqData.type}.`] = false;
                _b.sent();
                res.status(200).json({ message: "Commodity added" });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.log(err_1);
                sendRes_1.default(res, 400, "Could not create commodity item, refresh the page or try again later.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addCommodity = addCommodity;
var createUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                if (data.cofPass !== data.pass) {
                    return [2 /*return*/, sendRes_1.default(res, 400, "Confirm password does not match password.")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, firebase_services_1.default.auth().createUser({
                        email: data.email,
                        password: data.pass,
                    })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, user_1.default.create({
                        email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                    })];
            case 3:
                _a.sent();
                res.status(200).json({ message: "User created." });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, sendRes_1.default(res, 400, "Could not create user")];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var deleteCommodity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteData, amount, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({
                        email: req.rawHeaders[getUserEmail_1.default(req.rawHeaders)],
                        "commodities._id": req.body.id,
                    })];
            case 1:
                deleteData = _b.sent();
                if (!deleteData) {
                    return [2 /*return*/, sendRes_1.default(res, 400, "Could not ...")];
                }
                amount = deleteData.commodities
                    .map(function (el) {
                    if (el._id.toString() === req.body.id) {
                        return el.amount;
                    }
                    else {
                        return -1;
                    }
                })
                    .filter(function (el) { return el !== -1; });
                return [4 /*yield*/, user_1.default.findOneAndUpdate({
                        email: req.rawHeaders[getUserEmail_1.default(req.rawHeaders)],
                    }, {
                        $inc: (_a = {
                                total: -parseInt(amount[0])
                            },
                            _a["" + req.body.type] = -parseInt(amount[0]),
                            _a),
                        $pull: {
                            commodities: {
                                _id: req.body.id,
                            },
                        },
                    })];
            case 2:
                _b.sent();
                res.status(200).json({ message: "Deleted" });
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                console.log(err_3);
                sendRes_1.default(res, 400, "Could not edit commodity tab.");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCommodity = deleteCommodity;
var editCommodity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findOneAndUpdate({
                        email: req.rawHeaders[getUserEmail_1.default(req.rawHeaders)],
                        "commodities._id": req.body.id,
                    }, {
                        $set: {
                            "commodities.$.title": req.body.title,
                        },
                        $inc: (_a = {
                                total: req.body.amount
                            },
                            _a["" + req.body.type] = req.body.amount,
                            _a["commodities.$.amount"] = req.body.amount,
                            _a),
                    })];
            case 1:
                _b.sent();
                res.status(200).json({ message: "Commodity edited" });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _b.sent();
                console.log(err_4);
                sendRes_1.default(res, 400, "Could not edit commodity tab.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editCommodity = editCommodity;
var getPriceData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var priceData, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prices_1.default.findById("606cf5eefaaaa947c45b546e")];
            case 1:
                priceData = _a.sent();
                res.status(200).json(priceData);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, sendRes_1.default(res, 400, "Could not get metal prices.")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPriceData = getPriceData;
var getUserData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findOne({
                        email: req.rawHeaders[getUserEmail_1.default(req.rawHeaders)],
                    })];
            case 1:
                userData = _a.sent();
                res.status(200).json({
                    userData: userData,
                });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                console.log(err_6);
                return [2 /*return*/, sendRes_1.default(res, 400, "Could not get user data.")];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserData = getUserData;
var queryCommodities = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var commodities_1, commodities, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(req.params.string === "")) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.default.findOne({
                        email: req.rawHeaders[getUserEmail_1.default(req.rawHeaders)],
                    })];
            case 1:
                commodities_1 = _a.sent();
                return [2 /*return*/, res.status(200).json(commodities_1 === null || commodities_1 === void 0 ? void 0 : commodities_1.commodities)];
            case 2: return [4 /*yield*/, user_1.default.findOne({
                    email: req.rawHeaders[getUserEmail_1.default(req.rawHeaders)],
                    "commodities.title": { $regex: req.params.string },
                })];
            case 3:
                commodities = _a.sent();
                console.log(commodities === null || commodities === void 0 ? void 0 : commodities.commodities);
                res.status(200).json({ userData: commodities === null || commodities === void 0 ? void 0 : commodities.commodities });
                return [3 /*break*/, 5];
            case 4:
                err_7 = _a.sent();
                console.log(err_7);
                return [2 /*return*/, sendRes_1.default(res, 400, "Could not find commodity with that name")];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.queryCommodities = queryCommodities;
