'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/forms/register.form";

export default function RegisterPage() {
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) router.replace("/user");
    }, []);

    return <RegisterForm />;
}
