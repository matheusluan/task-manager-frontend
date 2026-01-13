import Link from "next/link";
import { api } from "@/lib/api";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/data-table";
import { columns } from "@/lib/columns/task.columns";
import { cookies } from "next/headers";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    const cookieStore = await cookies();
    const auth = cookieStore.get("auth");

    if (!auth) {
        throw new Error("Not authenticated");
    }

    const { data } = await api.get("/tasks", {
        params: {
            page: currentPage,
            limit: 10,
        },
        headers: {
            Cookie: `auth=${auth.value}`,
        },
    });

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Tasks</h2>
                    <span className="text-gray-500">
                        Manage your tasks here
                    </span>
                </div>

                <Link href="/tasks/create">
                    <Button size="icon">
                        <Plus />
                    </Button>
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={data.data}
                meta={data.meta}
            />
        </div>
    );
}
