"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendRes = function (res, code, message) {
    return res.status(code).json({ message: message });
};
exports.default = sendRes;
