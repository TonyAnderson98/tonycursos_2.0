import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface LoginRequest {
    email: string;
    password: string;
}

/**
 * Endpoint para autenticação de usuários.
 * @param req - Requisição contendo email e senha no corpo.
 * @returns Resposta JSON com dados do usuário ou erro.
 */
export async function POST(req: Request) {
    try {
        const { email, password }: LoginRequest = await req.json();

        // Validação de entrada
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email e senha são obrigatórios." },
                { status: 400 }
            );
        }

        // Verifica se o email existe
        const result = await pool.query(
            "SELECT id, name, password FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Email ou senha inválidos." },
                { status: 401 }
            );
        }

        const user = result.rows[0];

        // Verifica se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Email ou senha inválidos." },
                { status: 401 }
            );
        }

        return NextResponse.json({
            message: "Login bem-sucedido!",
            userId: user.id,
            name: user.name,
        });
    } catch (err) {
        console.error("Erro ao fazer login: ", err);
        return NextResponse.json(
            { error: "Erro interno no servidor." },
            { status: 500 }
        );
    }
}
