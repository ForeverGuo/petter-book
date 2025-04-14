"use strict";
var _a;
exports.__esModule = true;
exports.prisma = void 0;
var prisma_1 = require("../generated/prisma");
// 全局单例模式（避免 Serverless 环境连接泄露）
var globalForPrisma = globalThis;
exports.prisma = (_a = globalForPrisma.prisma) !== null && _a !== void 0 ? _a : new prisma_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
