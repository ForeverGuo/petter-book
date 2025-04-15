"use strict";
exports.__esModule = true;
exports.userList = exports.login = void 0;
var request_1 = require("./request");
exports.login = function (data) {
    return request_1["default"]({
        method: 'POST',
        url: '/login',
        data: data
    });
};
exports.userList = function () {
    return request_1["default"]({
        method: 'GET',
        url: '/users'
    });
};
