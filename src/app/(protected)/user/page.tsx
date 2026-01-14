'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { userStore } from "@/lib/stores/user.store";
import { ITask } from "@/lib/interfaces/task";
export default function HomeTasksRows() {

    const { user } = userStore();
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const { data } = await api.get("/tasks", {
                    params: { order: "dueDate", limit: 20 },
                });
                setTasks(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (loading) return <Loader2 className="mx-auto mt-10 animate-spin" />;

    const priorityBg: Record<string, string> = {
        LOW: "bg-green-50",
        MEDIUM: "bg-orange-50",
        HIGH: "bg-red-50",
    };
    const priorityText: Record<string, string> = {
        LOW: "text-green-800",
        MEDIUM: "text-orange-800",
        HIGH: "text-red-800",
    };

    const pendingTasks = tasks.filter(t => t.status === "PENDING").slice(0, 4);
    const inProgressTasks = tasks.filter(t => t.status === "IN_PROGRESS").slice(0, 4);

    const renderTaskCard = (task: ITask) => (
        <Link key={task.id} href={`/tasks/${task.id}`} prefetch={false} className="block">
            <div
                className={`h-48 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between p-5 ${priorityBg[task.priority] || "bg-gray-50"
                    }`}
            >
                <div className="flex flex-col gap-2 overflow-hidden h-40">
                    <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
                    <p className="text-xs text-gray-700 line-clamp-3">{task.description || "No description"}</p>
                </div>

                <div className="mt-2 flex justify-between items-center text-xs gap-1">
                    {task.dueDate ? (
                        <span className="text-gray-700 font-medium text-xs">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    ) : (
                        <span className="text-gray-400 italic">No due date</span>
                    )}

                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityText[task.priority] || "text-gray-700"
                            } border border-current`}
                    >
                        {task.priority}
                    </span>
                </div>
            </div>
        </Link>
    );

    return (
        <section className="bg-background rounded-lg p-6 space-y-10">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold truncate">Welcome back, {user?.name}!</h2>
            </div>

            {/* Pending Tasks Row */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Pending Tasks</h3>
                {pendingTasks.length === 0 ? (
                    <p className="text-gray-500 italic">No pending tasks ✅</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {pendingTasks.map(renderTaskCard)}
                    </div>
                )}
            </div>

            {/* In Progress Tasks Row */}
            <div>
                <h3 className="text-xl font-semibold mb-4">In Progress Tasks</h3>
                {inProgressTasks.length === 0 ? (
                    <p className="text-gray-500 italic">No tasks in progress</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {inProgressTasks.map(renderTaskCard)}
                    </div>
                )}
            </div>
        </section>
    );
}
