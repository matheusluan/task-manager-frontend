import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/forms/login.form";

export default async function LoginPage() {
  const list = await cookies();

  const auth = list.get("auth");

  if (auth) return redirect("/user");

  return <LoginForm />
}