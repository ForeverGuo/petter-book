"use client"

import { FormEvent, useState } from "react"
import { LoginForm } from "./loginForm"
export default function LoginPage() {
  const [ formData, setFormData ] = useState({
    username: "",
    password: ""
  })
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
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    console.log(data)
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
