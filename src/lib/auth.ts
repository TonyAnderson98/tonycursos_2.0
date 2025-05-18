import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import pool from "@/lib/db";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

// 🔧 Tipagem estendida para garantir campos obrigatórios no JWT e sessão
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name: string;
        email: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials): Promise<User | null> {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Credenciais incompletas.");
                    }

                    const result = await pool.query(
                        "SELECT id, name, email, password FROM users WHERE email = $1",
                        [credentials.email]
                    );

                    if (result.rows.length === 0) {
                        throw new Error("Usuário não encontrado.");
                    }

                    const user = result.rows[0];

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    if (!isValid) {
                        throw new Error("Senha incorreta.");
                    }

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email,
                    };
                } catch (err) {
                    console.error("Erro na autenticação:", err);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }): Promise<JWT> {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }): Promise<Session> {
            if (!session.user) throw new Error("Usuário da sessão ausente.");
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login", // ou outra página de erro, se preferir
    },

    secret: process.env.NEXTAUTH_SECRET,
};
