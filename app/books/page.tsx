"use client"

import { Button } from "components/ui/button"
import { Book, columns } from "./columns"
import { DataTable } from "./dataTable"
import { Input } from "components/ui/input"
import { bookList } from "libs/client/apis"
import { useCallback, useEffect, useState } from "react"

export default function BookListPage() {
  const [data, setData] = useState<Book[]>([])
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [pageSize] = useState<number>(10)

  const fetchData = useCallback(async () => {
    const { data: bookLists } = await bookList({
      page,
      pageSize,
      name: searchKeyword,
    })
    setData(bookLists)
  }, [page, pageSize, searchKeyword])

  const handleSearch = () => {
    setPage(1) // 搜索时重置到第一页
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="container mx-auto py-10">
      <div className="mb-5">
        <div className="grid-cols-3 grid gap-1.5">
          <div className="col-start-1 flex align-center">
            <Input
              type="text"
              placeholder="请输入关键字"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <Button className="w-20 ml-5" variant="outline" onClick={handleSearch}>
              搜索
            </Button>
          </div>
          <div className="col-start-3 flex justify-end">
            <Button className="bg-[var(--button-color)] text-white" asChild>
              <a href="/books/create">新建图书</a>
            </Button>
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}