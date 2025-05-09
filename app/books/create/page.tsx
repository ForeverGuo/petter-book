"use client";

import { useState } from "react";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { format } from "date-fns"
import Image from "next/image";
import { CalendarIcon } from "lucide-react";
import { cn } from "components/lib/utils";
import { Calendar } from "components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";

export default function CreateBook() {
  const [title, setTitle] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [publicationDate, setPublicationDate] = useState<Date>();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, publisher, publicationDate, coverImage });
    const publishDate = publicationDate ? format(publicationDate, "yyyy-MM-dd HH:mm") : null;
    console.log(publishDate)
    alert("图书信息提交成功！");
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-full mx-auto">
        <CardHeader>
          <CardTitle>新增图书</CardTitle>
          <CardDescription>请输入图书的基本信息</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2 flex">
              <Label htmlFor="title" className="w-18">书名</Label>
              <Input
                className="w-120"
                id="title"
                type="text"
                placeholder="请输入书名"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 flex">
              <Label htmlFor="publisher" className="w-18">出版社</Label>
              <Input
                className="w-120"
                id="publisher"
                type="text"
                placeholder="请输入出版社"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 flex">
              <Label htmlFor="publicationDate" className="w-18">创建时间</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !publicationDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {publicationDate ? format(publicationDate, "yyyy-MM-dd HH:mm") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={publicationDate}
                      onSelect={setPublicationDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
            </div>
            <div className="space-y-2 flex">
              <Label htmlFor="coverImage" className="w-18">图书封面</Label>
              <Input id="coverImage" className="w-120" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="space-y-2 ml-18">
              {preview && (
                <div className="mt-2">
                  <Image src={preview} alt="封面预览" width={128} height={128} className="rounded object-cover" />
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-4">
            <Button variant="outline" className="w-30 mr-3">
              取消
            </Button>
            <Button type="submit" className="w-30 bg-[var(--button-color)] text-white">
              提交
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}