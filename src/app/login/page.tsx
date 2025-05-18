"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/");
            }
        } catch (err) {
            setError("Erro ao conectar com o servidor. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <main className={styles.login}>
            <div className={styles.login__container}>
                <h1 className={styles.login__title}>Login</h1>
                {error && (
                    <div className={styles.login__error} role="alert">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className={styles.login__form}
                    aria-label="Formulário de login"
                >
                    <label className={styles.login__label} htmlFor="email">
                        Email
                    </label>
                    <input
                        className={styles.login__input}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Digite o seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <label className={styles.login__label} htmlFor="password">
                        Senha
                    </label>
                    <input
                        className={styles.login__input}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Insira a sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <button
                        className={styles.login__button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
                <p className={styles.login__text}>
                    Não tem uma conta?{" "}
                    <a href="/auth/register" className={styles.login__link}>
                        Registre-se
                    </a>
                </p>
                <p className={styles.login__text}>
                    <a
                        href="/auth/forgot-password"
                        className={styles.login__link}
                    >
                        Esqueceu a sua senha?
                    </a>
                </p>
            </div>
        </main>
    );
}
