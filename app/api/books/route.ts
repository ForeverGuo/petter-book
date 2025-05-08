import { prisma } from 'libs/prisma'
import { responseError, responseSuccess } from 'libs/server_utils'

/**
 * @description 用户登录
 * @author grantguo
 * @date 2025-04-11 14:48:07
*/
export async function GET(req: Request) {
  // console.log(req, "----------------")
  const bookList = await prisma.books.findMany()
  console.log(bookList, "%%%%%%%%%%%%%%%%")
  return responseSuccess(bookList);
}
 