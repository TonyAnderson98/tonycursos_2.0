// /src/components/Header.tsx
"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.link__itens}>
                    <li>
                        <Link href="/" className={styles.link__item}>
                            Início
                        </Link>
                    </li>
                    <li>
                        <Link href="/sobre" className={styles.link__item}>
                            Sobre
                        </Link>
                    </li>
                    <li>
                        <Link href="/contato" className={styles.link__item}>
                            Contato
                        </Link>
                    </li>
                    {session?.user ? (
                        <>
                            <li>
                                <span className={styles.link__item}>
                                    Olá, {session.user.name}
                                </span>
                            </li>
                            <li>
                                <button
                                    onClick={() => signOut()}
                                    className={styles.link__item}
                                >
                                    Sair
                                </button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link href="/login" className={styles.link__item}>
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}