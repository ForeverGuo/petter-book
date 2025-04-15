
import sha256 from 'crypto-js/sha256';
import { NextResponse } from 'next/server';

/**
 * @description 生成hash
 * @author grantguo
 * @date 2025-04-11 11:46:33
*/
export const generateHash = (data: string, bits = 32) => {
  const fullHash = sha256(data).toString();
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

