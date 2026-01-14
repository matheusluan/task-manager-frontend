'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { columns } from "@/lib/columns/task.columns";
import { DataTable } from "@/components/common/data-table";

export default function TasksPage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [meta, setMeta] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks", { params: { page: 1, limit: 10 } });
            setTasks(res.data.data);
            setMeta(res.data.meta);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Tasks</h2>
                    <span className="text-gray-500">Manage your tasks here</span>
                </div>

                <Link href="/tasks/create">
                    <Button size="icon">
                        <Plus />
                    </Button>
                </Link>
            </div>

            <DataTable columns={columns} data={tasks} meta={meta} />
        </div>
    );
}
