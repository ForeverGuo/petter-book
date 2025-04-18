import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from 'auth'

export default auth((req: any) => {
  console.log('middleware', req)
  const requesPathname= req.nextUrl.pathname
  // if (
  //   requesPathname.startsWith('/api') && 
  //   !requesPathname.startsWith('/api/login') && 
  //   !requesPathname.startsWith('/api/register')
  // ) {
  //   const token = request.headers.get('Token')
  //   if (!token) return responseError("非法请求", 403);
  //   if (!validateToken(token)) { // 自定义校验函数
  //     console.log('非法请求')
  //     return responseError("非法请求", 403);
  //   }
  // }
  // 排除不需要认证的路由
  const publicPaths = [
    '/auth/error',
    '/auth/signin',
    '/api/public'
  ]

  if (publicPaths.includes(requesPathname)) {
    return NextResponse.next()
  }
  console.log(req.auth, "+++++++++++++++++++++++++")
  if (!req.auth && !requesPathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
})


// export const config = {
//   matcher: '/api/:path*' // 仅拦截管理相关路径
// };

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
