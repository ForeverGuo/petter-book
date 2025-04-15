import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
import { responseError } from 'libs/server_utils';
export async function middleware(request: NextRequest) {
  console.log('middleware', request.nextUrl.pathname)
  const requesPathname= request.nextUrl.pathname
  if (requesPathname.startsWith('/api') && !requesPathname.startsWith('/api/login')) {
    const token = request.headers.get('token')
    if (!token) return responseError("非法请求", 403);
    if (!validateToken(token)) { // 自定义校验函数
      console.log('非法请求')
      return responseError("非法请求", 403);
    }
  }
  const requestHeaders = new Headers(request.headers)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  return response
}
const validateToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
    console.log(decoded, "decoded")
    return true;
  } catch (error) {
    console.log(error, "token error")
    return false;
  }
}

export const config = {
  matcher: '/api/:path*' // 仅拦截管理相关路径
};
