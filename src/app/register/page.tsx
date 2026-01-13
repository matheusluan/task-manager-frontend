import RegisterForm from "@/components/forms/register.form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
    const list = await cookies();

    const auth = list.get("auth");

    if (auth) return redirect("/user");

    return <RegisterForm />
}