"use strict";
exports.__esModule = true;
exports.responseSuccess = exports.responseError = exports.validateHash = exports.generateHash = void 0;
var crypto_1 = require("crypto");
var server_1 = require("next/server");
/**
 * @description 生成hash
 * @author grantguo
 * @date 2025-04-11 11:46:33
*/
exports.generateHash = function (data, bits) {
    if (bits === void 0) { bits = 32; }
    var fullHash = crypto_1["default"].createHash('sha256').update(data).digest('hex');
    return fullHash.substring(0, bits);
};
/**
 * @description 校验hash
 * @author grantguo
 * @date 2025-04-11 11:47:54
*/
exports.validateHash = function (clientHash, serverData) {
    var serverHash = exports.generateHash(serverData);
    return clientHash === serverHash;
};
/**
 * @description 错误响应
 * @author grantguo
 * @date 2025-04-11 13:32:14
*/
exports.responseError = function (message) {
    return server_1.NextResponse.json({
        code: 500,
        message: message
    });
};
/**
 * @description 成功响应
 * @author grantguo
 * @date 2025-04-11 13:32:14
*/
exports.responseSuccess = function (data) {
    return server_1.NextResponse.json({
        code: 200,
        data: data
    });
};
