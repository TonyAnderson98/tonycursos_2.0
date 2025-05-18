import styles from "./styles.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <nav>
                <ul className={styles.link__itens}>
                    <li><a className={styles.link__item} href="/">Início</a></li>
                    <li><a className={styles.link__item} href="/sobre">Sobre</a></li>
                    <li><a className={styles.link__item} href="/contato">Contato</a></li>
                    <li><span className={styles.link__item}>Olá, USER_NAME</span></li>
                    <li><span className={styles.link__item}>Sair</span></li>
                </ul>
            </nav>
        </header>
    );
}