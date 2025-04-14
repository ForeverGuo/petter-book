"use client"

import { Book, columns } from "./columns"
import { DataTable } from "./dataTable"
import { useLoading } from "components/context/loadingContext"
function getData():Array<Book> {
  return [
    {
      id: "728ed52f",
      author: "jhon example",
      title: "book example",
      publishName: "publish",
      coverImage: "https://example.com/cover.jpg",
      createdTime: "2023-01-01"
    }
  ]
}

export default function DemoPage() {
  // const { startLoading, endLoading } = useLoading();
  // startLoading()
  // setTimeout(() => {
  //   endLoading()
  // }, 1000)
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
