import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from 'auth'
import { Session } from 'next-auth'

type reqType = { auth: Session | null } & NextRequest

export default auth((req: reqType) => {
  // console.log('middleware', req)
  const requesPathname= req.nextUrl.pathname
  // 排除不需要认证的路由
  const publicPaths = [
    '/auth/error',
    '/auth/signin',
    '/api/public'
  ]

  if (publicPaths.includes(requesPathname)) {
    return NextResponse.next()
  }
  console.log(req.auth)
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
