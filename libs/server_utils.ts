import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from 'libs/prisma'
/**
 * @description 生成hash
 * @author grantguo
 * @date 2025-04-11 11:46:33
*/
export const generateHash = (data: string) => {
  return bcrypt.hashSync(data, 10)
};

/**
 * @description 校验hash
 * @author grantguo
 * @date 2025-04-11 11:47:54
*/
export const validateHash = (clientData:string, serverData:string) => {
  return bcrypt.compareSync(generateHash(clientData), serverData)
};


/**
 * @description 错误响应
 * @author grantguo
 * @date 2025-04-11 13:32:14
*/
export const responseError = (message: string | object, code: number = 500) => {
  return NextResponse.json({
    code: code,
    message,
  });
};

/**
 * @description 成功响应
 * @author grantguo
 * @date 2025-04-11 13:32:14
*/
export const responseSuccess = (data: string | object) => {
  return NextResponse.json({
    code: 200,
    data,
  });
};

interface userType {
  username: string;
  password: string;
}
export const findUser = async (data: userType) => {
  const { username, password } = data;
  const users = await prisma.users.findMany({
    where: {
      username,
    },
  });
  if (users.length === 0) {
    return {
      msg: "用户不存在"
    };
  }
  if (validateHash(password, users[0].password_hash)) {
    return {
      msg: "密码错误"
    };
  }
  
  return {
    username,
    email: users[0].email,
  }
}

