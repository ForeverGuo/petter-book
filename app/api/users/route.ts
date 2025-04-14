import { prisma } from 'libs/prisma'
import { generateHash, responseError, responseSuccess } from 'libs/server_utils'
import { z } from "zod"

// 用户注册校验模板
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

/**
 * @description 用户列表
 * @author grantguo
 * @date 2025-04-11 14:31:54
*/
export async function GET() {
  const users = await prisma.users.findMany();
  console.log(users);
  return responseSuccess(users);
}

/**
 * @description 用户注册
 * @author grantguo
 * @date 2025-04-11 14:31:54
*/
export async function POST(req: Request) {
  const data = await req.json();
  const validation = UserSchema.safeParse(data)
  if (!validation.success) {
    return responseError({ error: '参数校验失败', details: validation.error });
  }
  const { email, password } = data
  const users = await prisma.users.findMany({
    where: {
      email,
    },
  });

  if (users.length > 0) {
    return responseError("用户名已存在");
  }
  const pass_hash = generateHash(password);
  try {
    await prisma.users.create({
      data: {
        username: email,
        email,
        password,
        password_hash: pass_hash
      },
    });
    return responseSuccess("添加成功");
  } catch (error) {
    console.log(error);
  }
}
