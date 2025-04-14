"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "components/ui/button"
import Link from "next/link"

export type Book = {
  id: string
  // 书名
  title: string
  // 作者
  author: string
  // 出版社
  publishName: string
  // 封面图
  coverImage: string
  // 创建时间
  createdTime: string
}

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "书名",
    // cell: ({ row }) => {
    //   const book = row.original
    //   return (
    //     <div className="flex justify-center">
    //       {book.title}
    //     </div>
    //   )
    // },
  },
  {
    accessorKey: "coverImage",
    header: "封面图",
  },
  {
    accessorKey: "author",
    header: "作者",
  },
  {
    accessorKey: "publishName",
    header: "出版社",
  },
  {
    accessorKey: "createdTime",
    header: "创建时间",
  },
  {
    header: () => <div className="text-center">操作</div>,
    id: "actions",
    cell: ({ row }) => {
      const book = row.original
      return (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/books/${book.id}`}>查看</Link>
          </Button>
        </div>
      )
    },
  }
]
