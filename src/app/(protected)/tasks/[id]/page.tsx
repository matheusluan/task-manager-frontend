'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { updateTaskSchema, UpdateTaskSchema } from "@/lib/schemas/update-task.schema";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function EditTaskPage() {
    const router = useRouter();
    const params = useParams();
    const taskId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const { handleSubmit, register, reset, control, formState: { errors } } = useForm<UpdateTaskSchema>({
        resolver: zodResolver(updateTaskSchema),
    });
    const fetchTask = async () => {
        try {
            const res = await api.get(`/tasks/${taskId}`);
            const task = res.data;

            reset({
                ...task,
                priority: task.priority ?? "",
                status: task.status ?? "",
                dueDate: task.dueDate
                    ? new Date(task.dueDate).toISOString().split("T")[0]
                    : "",
            });
        } catch (err) {
            toast.error("Error fetching task");
        } finally {
            setLoading(false);
        }
    };

    // Fetch task data
    useEffect(() => {
        fetchTask();
    }, [taskId, reset]);

    async function onSubmit(values: UpdateTaskSchema) {
        try {
            setSaving(true);

            const payload: any = {
                title: values.title,
                description: values.description,
                priority: values.priority,
                status: values.status,
            };

            if (values.dueDate) {
                payload.dueDate = values.dueDate;
            }

            await api.put(`/tasks/${taskId}`, payload);
            toast.success("Task updated!");
            router.push("/tasks");
        } catch {
            toast.error("Error updating task");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <Loader2 className="mx-auto mt-10 animate-spin" />;

    return (
        <section className="bg-background rounded-lg py-4 space-y-4">
            <h2 className="text-xl font-semibold">Edit Task</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input id="title" {...register("title")} />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea id="description" {...register("description")} />
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="priority">Priority</FieldLabel>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value ?? ""}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="LOW">Low</SelectItem>
                                        <SelectItem value="MEDIUM">Medium</SelectItem>
                                        <SelectItem value="HIGH">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="status">Status</FieldLabel>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value ?? ""} // nunca null
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                        <SelectItem value="DONE">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="dueDate">Due date</FieldLabel>
                        <Input id="dueDate" type="date" {...register("dueDate")} />
                        {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
                    </Field>

                    <Field>
                        <Button type="submit" disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </section>
    );
}
