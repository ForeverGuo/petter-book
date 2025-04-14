
import crypto from 'crypto';
import { NextResponse } from 'next/server';

/**
 * @description 生成hash
 * @author grantguo
 * @date 2025-04-11 11:46:33
*/
export const generateHash = (data: string, bits = 32) => {
  const fullHash = crypto.createHash('sha256').update(data).digest('hex');
  return fullHash.substring(0, bits);
};

/**
 * @description 校验hash
 * @author grantguo
 * @date 2025-04-11 11:47:54
*/
export const validateHash = (clientHash:string, serverData:string) => {
  const serverHash = generateHash(serverData);
  return clientHash === serverHash;
};


/**
 * @description 错误响应
 * @author grantguo
 * @date 2025-04-11 13:32:14
*/
export const responseError = (message: string | object) => {
  return NextResponse.json({
    code: 500,
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