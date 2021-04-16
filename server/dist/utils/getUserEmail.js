"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getUserEmail = function (headers) {
    var number = 0;
    headers.forEach(function (el, index) {
        if (el === "email") {
            number = index;
        }
    });
    if (!number) {
        return -1;
    }
    else {
        return number + 1;
    }
};
exports.default = getUserEmail;
