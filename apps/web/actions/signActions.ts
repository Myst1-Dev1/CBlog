'use server'

import { revalidatePath } from 'next/cache';
import { ActionResult } from '../@types/ActionResult'
import { cookies } from "next/headers";

const API_URL = 'http://localhost:4011/'

export async function Login(_:ActionResult, formData: FormData): Promise<ActionResult> {
    const email = formData.get('email');
    const password = formData.get('password');

    if(!email || !password) return { success: false, message:'Preencha todos os campos' };

    try {
        const res = await fetch(`${API_URL}auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            return { success: false, message: error.message || 'Credenciais inválidas' };
        }

        const data = await res.json();

        const cookieStore = await cookies();
            cookieStore.set({
            name: "user",
            value: JSON.stringify(data),
            path: "/",
            maxAge: 60 * 60 * 24 * 1
        });

        revalidatePath('/', 'page');

        return { success: true, message:'Login feito com sucesso' }
    } catch (error:any) {
        return { success: false, message: error.message };
    }
}

export async function Register(_:ActionResult, formData: FormData): Promise<ActionResult> {
    try {
        const image = formData.get("image") as File | null;
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirm_password = formData.get('confirm_password');

        if(!username || !email || !password) return { success: false, message:'Preencha todos os campos !' };

        if(password !== confirm_password) return { success: false, message:'As senhas precisam ser iguais !' }

        const body = new FormData();

        body.append('username', username);
        body.append('email', email);
        body.append('password', password);

        if (image) {
            body.append("image", image, image.name);
        }

        const res = await fetch(`${API_URL}auth/registerNewUser`, {
            method: 'POST',
            body,
            cache: 'no-store'
        });

        if(!res.ok) return { success: false, message: 'Tivemos um erro ao fazer o cadastro' };

        return { success: true, message:'Cadastro feito com sucesso' }
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}