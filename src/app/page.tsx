import { api } from '@/lib/api';

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server';

    const email = formData.get('email');
    const password = formData.get('password');

    await api.post('/auth/login', {
      email,
      password,
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        action={handleLogin}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow"
      >
        <h1 className="text-center text-2xl font-bold">Login</h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded border px-3 py-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Senha"
          required
          className="w-full rounded border px-3 py-2"
        />

        <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
          Entrar
        </button>

        <p className="text-center text-sm">
          Não tem conta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Criar conta
          </a>
        </p>
      </form>
    </div>
  );
}
