// context/LoadingContext.ts
"use client";
"use strict";
exports.__esModule = true;
exports.useLoading = exports.LoadingProvider = void 0;
var react_1 = require("react");
var LoadingContext = react_1.createContext({});
function LoadingProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var startLoading = function () {
        setIsLoading(true);
    };
    var endLoading = function () {
        setIsLoading(false);
    };
    return value = {};
    {
        isLoading, startLoading, endLoading;
    }
}
exports.LoadingProvider = LoadingProvider;
 >
    { children: children }
    < /LoadingContext.Provider>;
;
exports.useLoading = function () { return react_1.useContext(LoadingContext); };
