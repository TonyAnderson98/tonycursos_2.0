import styles from "./styles.module.css";

/**
 * Componente que adiciona botões no Lesson Frame
 * @param {string} text - Texto passado para o botão
 * @example
 * <LessonFrameButton text={"Favoritar Aula"} >
 */

export default function LessonFrameButton({ text }) {
    return (
        <>
            <button className={styles.lesson__frame__button}>{text}</button>
        </>
    );
}
