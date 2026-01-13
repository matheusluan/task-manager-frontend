import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const list = await cookies();

    const auth = list.get("auth");

    if (!auth) redirect("/");

    try {
        const checkUser = await api.get("/auth/validate", {
            headers: {
                Cookie: `auth=${auth.value}`,
            },
        });

        if (checkUser.status !== 200) redirect("/");

        return <>{children}</>;

    } catch (error) {
        redirect("/");
    }

}
