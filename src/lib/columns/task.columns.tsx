'use client';

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ITask } from "../interfaces/task";

export const columns: ColumnDef<ITask>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;

            const colorMap: Record<typeof status, string> = {
                PENDING: "bg-yellow-100 text-yellow-800",
                IN_PROGRESS: "bg-blue-100 text-blue-800",
                DONE: "bg-green-100 text-green-800",
            };

            return (
                <Badge
                    variant="outline"
                    className={colorMap[status]}
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => {
            const map = { LOW: "secondary", MEDIUM: "default", HIGH: "destructive" } as const;
            return <Badge variant={map[row.original.priority]}>{row.original.priority}</Badge>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const isDone = row.original.status === "DONE";

            return (
                <Link
                    href={isDone ? "#" : `/tasks/${row.original.id}`}
                    prefetch={false}
                    className={`${isDone ? "pointer-events-none opacity-50" : ""}`}
                >
                    <Badge variant="secondary" className="cursor-pointer">
                        Edit
                    </Badge>
                </Link>
            );
        },
    }
];
