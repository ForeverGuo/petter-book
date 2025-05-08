import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser } from "libs/server_utils"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // 启用调试模式
  logger: {
    error(error: unknown) {
      console.error("Auth Error:", error);
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }
        // 检查用户是否存在
        const user = await findUser({
          username: credentials.username as string,
          password: credentials.password as string
        })
        if (!user || user.code == 500) {
          return null;
        }
        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async authorized({ request, auth }) {
      const url = request.nextUrl
      const user = auth?.user;
      
      if (url.pathname.startsWith('/admin') && !user) {
        return false
      }
  
      return true
    },
    jwt: async ({ token, user }) => {
      if ((user as { username?: string })?.username) {
        token.username = (user as { username: string }).username;
      }
      return token
    },
    session({ session, token }) {
      // console.log("session=", session)
      // console.log("token=", token)
      session.user = {
        id: token.sub as string,
        name: token.username as string || token.name,
        email: token.email as string,
        image: token.picture,
        emailVerified: null,
      };
      return session;
    },
  }
})
