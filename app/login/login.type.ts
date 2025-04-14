import { FormEvent } from "react";

export interface FormData {
  username: string;
  password: string;
}

export interface LoginFormProps {
  formData: FormData
  className?: string;
  onUpdate: (a: string, b: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
