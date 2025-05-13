import styles from "./styles.module.css";

export default function Login() {
    return (
        <main className={styles.login}>
            <div className={styles.login__container}>
                <h1 className={styles.login__title}>Login</h1>
                <form
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
                        required
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
                        required
                    />
                    <button className={styles.login__button} type="submit">
                        Entrar
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
