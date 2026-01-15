'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { userStore } from "@/lib/stores/user.store";
import ClientProvider from "@/components/common/client-provider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, setUser, clearUser } = userStore();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                clearUser();
                localStorage.removeItem("token");
                router.replace("/");
                return;
            }

            if (user) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/users/me");
                setUser(res.data);
                setLoading(false);
            } catch (err) {
                toast.info("Invalid or expired token.")
                clearUser();
                localStorage.removeItem("token");
                router.replace("/");

            }
        };

        loadUser();
    }, [router, setUser, clearUser, user]);

    if (loading || !user) return <Loader2 className="m-auto animate-spin mt-10" />;

    return <ClientProvider user={user}>{children}</ClientProvider>;
}
