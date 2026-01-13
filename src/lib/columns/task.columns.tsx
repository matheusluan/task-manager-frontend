"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type Task = {
    id: string;
    title: string;
    status: "PENDING" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
};

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="outline">
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
            const map = {
                LOW: "secondary",
                MEDIUM: "default",
                HIGH: "destructive",
            } as const;

            return (
                <Badge variant={map[row.original.priority]}>
                    {row.original.priority}
                </Badge>
            );
        },
    },
];
