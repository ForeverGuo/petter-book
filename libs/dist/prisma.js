"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var prisma_1 = require("../generated/prisma");
// import { PrismaClient } from '@prisma/client'
// 全局单例模式（避免 Serverless 环境连接泄露）
var globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma || new prisma_1.PrismaClient();
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
