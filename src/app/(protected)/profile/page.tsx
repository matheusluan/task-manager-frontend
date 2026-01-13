"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { userStore } from "@/lib/stores/user.store";
import { Loader2, Trash } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    updateUserSchema,
    UpdateUserSchema,
} from "@/lib/schemas/update-user.schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const { user, setUser, clearUser } = userStore();
    const [deleting, setDeleting] = useState(false)
    const {
        handleSubmit,
        register,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema),
    });

    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email,
                password: "",
                confirmPassword: "",
            });
        }
    }, [user, reset]);

    if (!user) return null;

    async function onSubmit(values: UpdateUserSchema) {
        try {
            const payload: any = {
                name: values.name,
                email: values.email,
            };

            if (values.password) payload.password = values.password;

            const { data: updatedUser } = await api.put("/users", payload);

            setUser(updatedUser);
            toast.success("Profile updated!");
            reset({ ...values, password: "", confirmPassword: "" });
        } catch {
            toast.error("Error updating profile");
        }
    }

    async function deleteUser() {
        try {
            setDeleting(true)
            await api.delete("/users")
            clearUser()
            toast.success("Successfully deleted")
            router.push("/")
        } catch (error) {
            toast.error("Error while deleting account")
        } finally {
            setDeleting(false)
        }
    }

    return (
        <section className="bg-background rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Profile</h2>
                    <span className="text-gray-500">Update your account information</span>
                </div>

                <Button type="button" size="icon" className="cursor-pointer" variant="destructive" onClick={deleteUser} disabled={deleting}>
                    {deleting ? <Loader2 className="animate-spin" /> : <Trash />}
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input id="name" {...register("name")} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input id="password" type="password" {...register("password")} />
                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                        <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </Field>

                    <Field>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </Field>
                </FieldGroup>
            </form>
        </section>
    );
}
