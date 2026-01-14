import Link from "next/link";
import { ITask } from "@/lib/interfaces/task";
import { Badge } from "../ui/badge";

const priorityBg: Record<string, string> = {
    LOW: "bg-emerald-50",
    MEDIUM: "bg-amber-50",
    HIGH: "bg-rose-50",
};

const priorityText: Record<string, string> = {
    LOW: "text-emerald-700",
    MEDIUM: "text-amber-700",
    HIGH: "text-rose-700",
};

const statusStyles: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800 border border-amber-200",
    IN_PROGRESS: "bg-sky-100 text-sky-800 border border-sky-200",
    DONE: "bg-emerald-100 text-emerald-800 border border-emerald-200",
};

interface TaskCardProps {
    task: ITask;
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <Link href={`/tasks/${task.id}`} prefetch={false} className="block">
            <div
                className={`h-48 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between p-5 ${priorityBg[task.priority] || "bg-muted"
                    }`}
            >
                <div className="flex justify-between gap-3 overflow-hidden">
                    <div className="flex flex-col gap-2 overflow-hidden">
                        <h3 title={task.title} className="text-lg font-semibold text-gray-900 truncate">
                            {task.title}
                        </h3>
                        <p className="text-xs text-gray-600 truncate max-w-100">
                            {task.description || "No description"}
                        </p>
                    </div>

                    <Badge
                        className={`h-fit px-2 py-1 text-[10px] font-semibold rounded-md ${statusStyles[task.status] || "bg-muted text-muted-foreground"
                            }`}
                    >
                        {task.status.replace("_", " ")}
                    </Badge>
                </div>

                <div className="mt-2 flex justify-between items-center text-xs">
                    {task.dueDate ? (
                        <span className="text-gray-500">
                            Due {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    ) : (
                        <span className="text-gray-400 italic">No due date</span>
                    )}

                    <span
                        className={`px-2 py-1 rounded-full text-[10px] font-semibold ${priorityText[task.priority] || "text-muted-foreground"
                            } border border-current`}
                    >
                        {task.priority}
                    </span>
                </div>
            </div>
        </Link>
    );
}
