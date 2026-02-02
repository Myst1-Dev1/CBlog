'use server'

import { cookies } from "next/headers";

interface Result {
  success: boolean;
  message?: string;
}

export async function Login(_:Result, formData: FormData): Promise<Result> {
    const email = formData.get('email');
    const password = formData.get('password');

    if(!email || !password) return { success: false, message:'Preencha todos os campos' };

    try {
        const res = await fetch('http://localhost:4011/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            cache: 'no-store'
        });

        if (!res.ok) {
            const error = await res.json();
            return { success: false, message: error.message || 'Credenciais inválidas' };
        }

        const data = await res.json();

        if (!data.token) {
            return { success: false, message: 'Token não recebido' };
        }

        const cookieStore = await cookies();
            cookieStore.set({
            name: "user-token",
            value: data.token,
            path: "/",
            maxAge: 60 * 60 * 24 * 1
        });

        return { success: true, message:'Login feito com sucesso' }
    } catch (error:any) {
        return { success: false, message: error.message };
    }
}