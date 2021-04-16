"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var contact_1 = __importDefault(require("./routes/contact"));
var updatePrices_1 = __importDefault(require("./utils/updatePrices"));
var helmet_1 = __importDefault(require("helmet"));
var hpp_1 = __importDefault(require("hpp"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var compression_1 = __importDefault(require("compression"));
var app = express_1.default();
app.use(helmet_1.default);
var limiter = express_rate_limit_1.default({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/", limiter);
app.use(express_1.default.static(path_1.default.join(__dirname, "./../../build")));
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_mongo_sanitize_1.default());
app.use(hpp_1.default({
    whitelist: ["duration"],
}));
// BE CAREFUL WHEN UPDATING THIS FILE. WILL CORRUPT AND CAUSE ERRORS IN THE JS FORMAT.
updatePrices_1.default();
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/contact", contact_1.default);
app.use(compression_1.default());
app.use(function (req, res, next) {
    res.sendFile(path_1.default.join(__dirname, "./../../build", "index.html"));
});
exports.default = app;
