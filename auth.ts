import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "libs/prisma"
import { findUser } from "libs/server_utils"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        if (!credentials) {
          return null;
        }
        // 1. 查找用户
        const user = await findUser({
          username: credentials.username,
          password: credentials.password
        })
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        console.log("user------------------", user);
        // // // 2. 验证密码
        // if (user && bcrypt.compareSync(credentials.password, user.password)) {
        //   return { id: user.id.toString(), name: user.username, email: user.email };
        // }
        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async authorized({ request, auth }) {
      // console.log('authorized', request, auth)
      const url = request.nextUrl
      const user = auth?.user;
      
      if (url.pathname.startsWith('/admin') && !user) {
        return false
      }
  
      return true
    },
    // async session({ session, token }) {
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub
    //     session.user.role = token.role as string
    //   }
    //   return session
    // },
    async jwt({ token, user }) {
      console.log('jwt', token, user)
      if (user) {
        token.role = user.role
      }
      return token
    }
  }
})
