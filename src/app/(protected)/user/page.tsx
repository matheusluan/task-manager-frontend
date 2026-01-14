'use client';

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { userStore } from "@/lib/stores/user.store";
import { ITask } from "@/lib/interfaces/task";
import { TaskCard } from "@/components/common/task-card";

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

    const pendingTasks = tasks.filter(t => t.status === "PENDING").slice(0, 4);
    const inProgressTasks = tasks.filter(t => t.status === "IN_PROGRESS").slice(0, 4);

    return (
        <section className="bg-background rounded-lg p-6 space-y-10">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold truncate">
                    Welcome back, {user?.name}!
                </h2>
            </div>

            {/* Pending Tasks Row */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Pending Tasks</h3>
                {pendingTasks.length === 0 ? (
                    <p className="text-gray-500 italic">No pending tasks ✅</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {pendingTasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
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
                        {inProgressTasks.map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
