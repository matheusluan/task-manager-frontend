'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { registerSchema, RegisterSchema } from '@/lib/schemas/register.schema';
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

export default function RegisterForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
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
                err?.response?.status === 409 ? 'Email already exist' : 'Error',
            );
        }
    }

    return (
        <div
            className={cn('flex items-center justify-center min-h-dvh', className)}
            {...props}
        >
            <div className="min-w-80 md:min-w-130 max-w-225 flex flex-col gap-1">
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
                            <FieldGroup>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <h1 className="text-2xl font-bold">Create your account</h1>
                                    <p className="text-muted-foreground text-balance">
                                        Sign up to get started
                                    </p>
                                </div>

                                <Field>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input
                                        id="name"
                                        disabled={isSubmitting}
                                        {...form.register('name')}
                                    />
                                </Field>

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
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        disabled={isSubmitting}
                                        {...form.register('password')}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="confirmPassword">
                                        Confirm password
                                    </FieldLabel>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        disabled={isSubmitting}
                                        {...form.register('confirmPassword')}
                                    />
                                </Field>

                                <Field>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="cursor-pointer mt-2"
                                    >
                                        {isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Create account
                                    </Button>
                                </Field>

                                <FieldDescription className="text-center">
                                    Already have an account? <a href="/">Login</a>
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
