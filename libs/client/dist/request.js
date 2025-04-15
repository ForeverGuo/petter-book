"use strict";
exports.__esModule = true;
var js_cookie_1 = require("js-cookie");
var axios_1 = require("axios");
var navigation_1 = require("next/navigation");
var instance = axios_1["default"].create({
    baseURL: '/api',
    timeout: 5000
});
// request拦截器
instance.interceptors.request.use(function (config) {
    console.log('request', config, js_cookie_1["default"].get("token"));
    if (js_cookie_1["default"].get("token")) {
        config.headers['token'] = js_cookie_1["default"].get("token");
    }
    else {
        navigation_1.redirect("/login");
    }
    return config;
}, function (error) {
    console.log(error); // for debug
    Promise.reject(error);
});
// respone拦截器
instance.interceptors.response.use(function (response) {
    var res = response.data;
    if (res.code) {
        switch (res.code) {
            case 200:
                break;
            case 500:
                break;
            case 403:
                navigation_1.redirect("/login");
                break;
            default:
        }
    }
    return response.data;
}, function (error) {
    console.log('err' + error);
    return Promise.reject(error);
});
exports["default"] = instance;
