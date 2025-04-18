import { prisma } from 'libs/prisma'
import { responseSuccess } from 'libs/server_utils'

/**
 * @description 用户列表
 * @author grantguo
 * @date 2025-04-11 14:31:54
*/
export async function GET() {
  const users = await prisma.users.findMany();
  return responseSuccess(users);
}

