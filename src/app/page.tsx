'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/forms/login.form";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) router.replace("/user");
  }, []);

  return <LoginForm />;
}
