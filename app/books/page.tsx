"use client"

import { Button } from "components/ui/button"
import { Book, columns } from "./columns"
import { DataTable } from "./dataTable"
import { Input } from "components/ui/input"
import { bookList } from "libs/client/apis"
import { useEffect, useState } from "react"

// async function getData():Promise<Book[]> {
//   const bookLists = await bookList();
//   console.log(bookLists)
//   return [
//     {
//       id: "728ed52f",
//       author: "jhon example",
//       title: "book example",
//       publishName: "publish",
//       coverImage: "https://example.com/cover.jpg",
//       createdTime: "2023-01-01"
//     }
//   ]
// }

export default function BookListPage() {
  const [data, setData] = useState<Book[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      const { data: bookLists } = await bookList();
      console.log(bookLists)
      setData(bookLists)
    }
    fetchData()
  }, [])

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5">
        <div className="grid-cols-3 grid gap-1.5">
          <div className="col-start-1 flex align-center">
            <Input type="text" placeholder="请输入关键字" />
            <Button className="w-20 ml-5" variant="outline">搜索</Button> 
          </div>
          <div className="col-start-3 flex justify-end">
            <Button className="{ bg-(--button-color) text-white }" asChild>
              <a href="/books/create">新建图书</a>  
            </Button> 
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
