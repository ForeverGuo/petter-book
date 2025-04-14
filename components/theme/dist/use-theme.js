"use client";
"use strict";
exports.__esModule = true;
exports.useTheme = void 0;
var react_1 = require("react");
var theme_provider_1 = require("./theme-provider");
exports.useTheme = function () {
    var context = react_1.useContext(theme_provider_1.ThemeContext);
    if (!context) {
        throw new Error("useTheme 必须包裹在 ThemeProvider 内使用");
    }
    return {
        theme: context.theme,
        setTheme: context.setTheme,
        toggleTheme: function () {
            return context.setTheme(context.theme === "light" ? "dark" : "light");
        }
    };
};
