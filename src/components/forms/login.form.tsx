'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginSchema } from '@/lib/schemas/login.schema';
import { api } from '@/lib/api';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { userStore } from '@/lib/stores/user.store';


export default function LoginForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const router = useRouter();
    const { setUser } = userStore();

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
            const { data: response } = await api.post('/auth/login', data);
            setUser(response?.user);
            localStorage.setItem("token", response?.access_token);
            toast.success('Welcome!!');
            router.push('/user');
        } catch (err: any) {
            toast.error(
                err.response.data.message
            );
        }
    }

    return (
        <div className={cn('flex items-center justify-center min-h-dvh', className)} {...props}>
            <div className='min-w-80 md:min-w-130 max-w-225 flex flex-col gap-1'>
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="p-4"
                        >
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Login to your account
                                    </p>
                                </div>

                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        disabled={isSubmitting}
                                        {...form.register('email')}
                                    />
                                </Field>

                                <Field>
                                    <div className="flex items-center">
                                        <FieldLabel htmlFor="password">Password</FieldLabel>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        disabled={isSubmitting}
                                        {...form.register('password')}
                                    />
                                </Field>

                                <Field>
                                    <Button type="submit" disabled={isSubmitting} className='cursor-pointer mt-2'>
                                        {isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Login
                                    </Button>
                                </Field>

                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <a href="/register">Sign up</a>
                                </FieldDescription>
                            </FieldGroup>
                        </form>

                        <div className="bg-muted relative hidden md:block">
                            <img
                                src="/image.webp"
                                alt="Image"
                                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            />
                        </div>
                    </CardContent>
                </Card>

                <FieldDescription className="px-6 text-center">
                    Join the best task manager
                </FieldDescription>
            </div>
        </div>
    );
}
