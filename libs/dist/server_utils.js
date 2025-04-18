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
exports.__esModule = true;
exports.findUser = exports.responseSuccess = exports.responseError = exports.validateHash = exports.generateHash = void 0;
var server_1 = require("next/server");
var bcryptjs_1 = require("bcryptjs");
var prisma_1 = require("libs/prisma");
/**
 * @description 生成hash
 * @author grantguo
 * @date 2025-04-11 11:46:33
*/
exports.generateHash = function (data) {
    return bcryptjs_1["default"].hashSync(data, 10);
};
/**
 * @description 校验hash
 * @author grantguo
 * @date 2025-04-11 11:47:54
*/
exports.validateHash = function (clientData, serverData) {
    return bcryptjs_1["default"].compareSync(exports.generateHash(clientData), serverData);
};
/**
 * @description 错误响应
 * @author grantguo
 * @date 2025-04-11 13:32:14
*/
exports.responseError = function (message, code) {
    if (code === void 0) { code = 500; }
    return server_1.NextResponse.json({
        code: code,
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
exports.findUser = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = data.username, password = data.password;
                return [4 /*yield*/, prisma_1.prisma.users.findMany({
                        where: {
                            username: username
                        }
                    })];
            case 1:
                users = _a.sent();
                if (users.length === 0) {
                    return [2 /*return*/, {
                            msg: "用户不存在"
                        }];
                }
                if (exports.validateHash(password, users[0].password_hash)) {
                    return [2 /*return*/, {
                            msg: "密码错误"
                        }];
                }
                return [2 /*return*/, {
                        username: username,
                        email: users[0].email
                    }];
        }
    });
}); };
