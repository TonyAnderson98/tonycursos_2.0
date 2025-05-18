import styles from "./styles.module.css";
import Link from "next/link";

export default function Header() {
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
                    <li><span className={styles.link__item}>Olá, USER_NAME</span></li>
                    <li><span className={styles.link__item}>Sair</span></li>
                </ul>
            </nav>
        </header>
    );
}