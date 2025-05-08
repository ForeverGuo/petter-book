"use strict";
exports.__esModule = true;
exports.bookList = exports.userList = exports.login = void 0;
var request_1 = require("./request");
/**
 * @description 登录
 * @author grantguo
 * @date 2025-05-06 16:56:56
*/
exports.login = function (data) {
    return request_1["default"]({
        method: 'POST',
        url: '/login',
        data: data
    });
};
/**
 * @description 获取用户列表
 * @author grantguo
 * @date 2025-05-06 16:56:56
*/
exports.userList = function () {
    return request_1["default"]({
        method: 'GET',
        url: '/users'
    });
};
/**
 * @description 获取book列表
 * @author grantguo
 * @date 2025-05-06 17:00:31
*/
exports.bookList = function () {
    return request_1["default"]({
        method: 'GET',
        url: '/books'
    });
};
