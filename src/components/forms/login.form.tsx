'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { loginSchema, LoginSchema } from '@/lib/schemas/login.schema';
import { api } from '@/lib/api';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

export default function LoginForm() {
    const router = useRouter();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    async function onSubmit(data: LoginSchema) {
        try {
            await api.post('/auth/login', data);

            toast.success('Welcome!!');

            router.push('/user');
        } catch (err: any) {
            toast.error(
                err?.response?.status === 401
                    ? 'Invalid Credentials'
                    : 'Erro inesperado, tente novamente'
            );
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-sm space-y-6 rounded-lg bg-background p-6 shadow"
                >
                    <h1 className="text-center text-2xl font-semibold">
                        Login
                    </h1>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        autoComplete="email"
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        autoComplete="current-password"
                                        disabled={isSubmitting}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Login
                    </Button>
                </form>
            </Form>
        </div>
    );
}
