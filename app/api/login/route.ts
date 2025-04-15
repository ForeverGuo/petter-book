import { NextResponse } from "next/server";
import { prisma } from 'libs/prisma'
import { responseError, responseSuccess, validateHash } from 'libs/server_utils'
import { z } from "zod"
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';

const SECRET_KEY = process.env.SECRET_KEY!; // 生产环境应使用环境变量
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

  // 2. 生成带过期时间的 JWT
  const token = jwt.sign(
    { userId: users[0].password_hash },
    SECRET_KEY,
    { expiresIn: '1h' } // Token 有效期 1 小时
  );

  const res = NextResponse.next()
  res.headers.set('Set-Cookie', serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60, // 1 hour
    path: '/',
  }));
  
  return responseSuccess({
    token: token,
    user: {
      username,
      email: users[0].email,
    },
  });
}
