'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Loader2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from "@/components/ui/table";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { columns } from "@/lib/columns/task.columns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export default function TasksPage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [meta, setMeta] = useState<any>({ page: 1, totalPages: 1, totalItems: 0 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [take, setTake] = useState(10);

    const fetchTasks = async (page: number, take: number) => {
        setLoading(true);
        try {
            const { data } = await api.get("/tasks", { params: { page, limit: take } });
            setTasks(data.data);
            setMeta(data.meta);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(page, take);
    }, [page, take]);

    const table = useReactTable({
        data: tasks,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="py-4 space-y-4">
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

            {
                loading ? <Loader2 className="mx-auto animate-spin my-10" /> :
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <TableHead key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map(row => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
            }


            {/* Pagination */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm">Rows:</span>
                    <Select value={String(take)} onValueChange={(val) => setTake(Number(val))} >
                        <SelectTrigger className="w-20 cursor-pointer">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 5, 10, 20].map(n => (
                                <SelectItem key={n} value={String(n)}>
                                    {n}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex gap-2 items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={page <= 1}
                        onClick={() => setPage(page - 1)}
                        className="cursor-pointer"
                    >
                        <ChevronLeft />
                    </Button>

                    <span className="text-sm px-2">
                        {page} of {meta.totalPages}
                    </span>

                    <Button
                        size="icon"
                        variant="outline"
                        disabled={page >= meta.totalPages}
                        onClick={() => setPage(page + 1)}
                        className="cursor-pointer"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </div>
    );
}
