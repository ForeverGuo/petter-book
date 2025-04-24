"use client"

import { FormEvent, useEffect, useState } from "react"
import { LoginForm } from "./loginForm"
import { redirect } from 'next/navigation';
import { signIn } from "next-auth/react";
import { toast } from "sonner"
export default function LoginPage() {
  const [ formData, setFormData ] = useState({
    username: "",
    password: ""
  })
  useEffect(() => {

  }, [])
  // 统一更新函数
  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 提交表单数据
  const submitFormData = async (e: FormEvent<HTMLFormElement>) => {
    // 阻止表单默认行为
    e.preventDefault();
    console.log(formData)
    const result = await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: false,
    });
    console.log(result, "++++++++++++++++")
    if (result?.error) {
      toast.warning(result.error)
      return;
    }
    if (result?.ok) {
      redirect("/")
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm
          formData={formData} 
          onUpdate={updateFormData}
          onSubmit={submitFormData}
        />
      </div>
    </div>
  )
}

