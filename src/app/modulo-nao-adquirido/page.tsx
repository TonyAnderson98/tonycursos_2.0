"use client";

import Link from "next/link";
import styles from "./styles.module.css";

export default function ModuleNaoAdquirido() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Módulo Não Adquirido</h1>
            <p className={styles.message}>Você não tem acesso a este módulo.</p>
            <p className={styles.message}>Para adquirir o módulo, <Link href="/loja" className={styles.link}>visite a loja</Link>.</p>
            <Link href="/" className={styles.homeLink}>
                Voltar para a página inicial
            </Link>
        </div>
    );
}