'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { registerSchema, RegisterSchema } from '@/lib/schemas/register.schema';
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
import Link from 'next/link';

export default function RegisterForm() {
    const router = useRouter();

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const isSubmitting = form.formState.isSubmitting;

    async function onSubmit(data: RegisterSchema) {
        try {
            await api.post('/auth/register', {
                name: data.name,
                email: data.email,
                password: data.password,
            });

            toast.success('Registered!');
            router.push('/user');
        } catch (err: any) {
            toast.error(
                err?.response?.status === 409
                    ? 'Email already exist '
                    : 'Error'
            );
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-sm rounded-lg bg-background p-6 shadow space-y-3"
                >
                    <h1 className="text-center text-2xl font-semibold">
                        Register
                    </h1>

                    <div className='space-y-5'>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isSubmitting} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="new-password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                        {isSubmitting && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create account
                    </Button>

                    <Link href="/" prefetch={false} >
                        <Button type='button' variant='ghost' className='w-full' disabled={isSubmitting}>
                            Already member of the house ?
                        </Button>
                    </Link>
                </form>
            </Form>
        </div>
    );
}
