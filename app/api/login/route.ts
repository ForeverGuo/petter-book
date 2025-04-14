import { prisma } from 'libs/prisma'
import { generateHash, responseError, responseSuccess, validateHash } from 'libs/server_utils'
import { z } from "zod"

const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
})

/**
 * @description 用户登录
 * @author grantguo
 * @date 2025-04-11 14:48:07
*/
export async function POST(req: Request) {
  const reqData = await req.json()
  const validation = UserSchema.safeParse(reqData)
  if (!validation.success) {
    return responseError({ error: '参数校验失败', details: validation.error });
  }
  const { username, password } = reqData
  const users = await prisma.users.findMany({
    where: {
      username,
    },
  });
  if (users.length === 0) {
    return responseError("用户不存在");
  }
  if (validateHash(password, users[0].password_hash)) {
    return responseError("密码错误");
  }
  return responseSuccess({
    token: generateHash(username + password),
    user: {
      username,
      email: users[0].email,
    },
  });
}