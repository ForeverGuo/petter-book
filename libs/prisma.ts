import { PrismaClient } from '../generated/prisma'
// import { PrismaClient } from '@prisma/client'

// 全局单例模式（避免 Serverless 环境连接泄露）
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
