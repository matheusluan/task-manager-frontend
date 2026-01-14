export type TaskStatus = "PENDING" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ITask {
    id: string;
    title: string;
    description?: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string | null; 
    createdAt: string;
    updatedAt: string;

    userId: string;
}
