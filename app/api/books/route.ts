
import { prisma } from 'libs/prisma'
import { responseSuccess } from 'libs/server_utils'
import type { NextRequest } from 'next/server'
import type { Prisma } from '@prisma/client'
   
   /**
    * @description 用户登录
    * @author grantguo
    * @date 2025-04-11 14:48:07
    */
   export async function GET(request: NextRequest, { params }: { params: Record<string, string | string[]> }) {
     console.log(params, "----------------")
     const url = new URL(request.url)
     const pageStr = url.searchParams.get('page')
     const pageSizeStr = url.searchParams.get('pageSize')
     const name = url.searchParams.get('name')
   
     const page = parseInt(pageStr || '1')
     const pageSize = parseInt(pageSizeStr || '10')
   
     // 分页查询
     const bookList = await prisma.books.findMany({
       where: name ? {
        title: {
          contains: name,
        }
       } : {},
       skip: (page - 1) * pageSize,
       take: pageSize,
     })
   
     console.log(bookList, "%%%%%%%%%%%%%%%%")
     return responseSuccess(bookList)
   }