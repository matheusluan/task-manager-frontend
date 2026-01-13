"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { createTaskSchema, CreateTaskSchema } from "@/lib/schemas/create-task.schema";

export default function Page() {
    const router = useRouter();
    const [creating, setCreating] = useState(false);

    const {
        handleSubmit,
        register,
        reset,
        control,
        formState: { isSubmitting, errors },
    } = useForm<CreateTaskSchema>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            priority: undefined,
        },
    });

    async function onSubmit(values: CreateTaskSchema) {
        try {
            setCreating(true);

            const payload = {
                ...values,
                ...(values.dueDate ? {} : { dueDate: undefined }),
            };

            await api.post("/tasks", payload);

            toast.success("Task created!");
            reset();
            router.push("/tasks");
        } catch {
            toast.error("Error creating task");
        } finally {
            setCreating(false);
        }
    }

    return (
        <section className="bg-background rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Create Task</h2>
                    <span className="text-gray-500">Add a new task to your list</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="title">Title</FieldLabel>
                        <Input id="title" {...register("title")} />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title.message}</p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="description">Description</FieldLabel>
                        <Textarea id="description" {...register("description")} />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="priority">Priority</FieldLabel>

                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
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

                        {errors.priority && (
                            <p className="text-sm text-red-500">{errors.priority.message}</p>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="dueDate">Due date</FieldLabel>
                        <Input id="dueDate" type="date" {...register("dueDate")} />
                        {errors.dueDate && (
                            <p className="text-sm text-red-500">{errors.dueDate.message}</p>
                        )}
                    </Field>

                    <Field>
                        <Button type="submit" disabled={isSubmitting || creating}>
                            {(isSubmitting || creating) && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Create
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </section>
    );
}
