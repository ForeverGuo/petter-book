"use strict";
exports.__esModule = true;
exports.useSidebarState = void 0;
var sidebar_1 = require("components/ui/sidebar");
exports.useSidebarState = function () {
    var context = sidebar_1.useSidebar();
    return {
        state: context.state
    };
};
