import ClientProvider from "@/components/common/client-provider";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");

    if (!auth) redirect("/logout");

    try {
        const checkUser = await api.get("/users/me", {
            headers: {
                Cookie: `auth=${auth.value}`,
            },
        });

        return (
            <ClientProvider user={checkUser.data}>
                {children}
            </ClientProvider>
        );

    } catch {
        redirect("/logout");
    }
}
