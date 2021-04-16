"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var app_1 = __importDefault(require("./app"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../config.env") });
var db = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace("<PASSWORD>", "" + process.env.PASSWORD);
mongoose_1.default
    .connect("" + db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(function (err) { return console.log("Connected to database"); })
    .catch(function (err) { return console.log(err); });
var port = process.env.PORT || 8080;
app_1.default.listen(port, function () { return console.log("Server running on port " + port); });
