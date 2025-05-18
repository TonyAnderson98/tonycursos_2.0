"use client";
import React, { useState, useEffect } from "react";
import LessonFrameButton from "../LessonFrameButton";

import styles from "./styles.module.css";
import Test from "../Test";

interface LessonData {
    id: number;
    lesson_name: string;
    lesson_description: string;
    video_url?: string;
    lesson_video_id: string;
}

/**
 * Componente que exibe um frame de aula com vídeo do YouTube e informações
 * @param {Object} props - As propriedades do componente
 * @param {string} props.lessonId - O ID da aula a ser carregada
 * @returns {JSX.Element} O componente de frame de aula
 * @example
 * Componente que exibe
 * <LessonFrame lessonId="123" />
 */
export default function LessonFrame({ lessonId }: { lessonId: string }) {
    const [lessonData, setLessonData] = useState<LessonData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /**
         * Busca os dados da aula na API
         * @param {string} lessonId - O ID da aula a ser buscada
         */
        const fetchLessonId = async (lessonId: string) => {
            try {
                const response = await fetch(`/api/lesson/${lessonId}`);
                const data = await response.json();
                setLessonData(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (lessonId) {
            fetchLessonId(lessonId);
        }
    }, [lessonId]);

    if (loading) {
        return <div>Carregando aula...</div>;
    }

    return (
        <div>
            <div>
                <iframe
                    width="1000"
                    height="563"
                    src={`https://www.youtube.com/embed/${lessonData?.lesson_video_id}`}
                    title="Title"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
            <section className={styles.lesson__details}>
                <div>
                    <h2 className={styles.lesson__title}>
                        {lessonData?.lesson_name}
                    </h2>
                    <p className={styles.lesson__description}>
                        {lessonData?.lesson_description}
                    </p>
                </div>
                <div>
                    <LessonFrameButton text={"Favoritar aula"} />{" "}
                    <LessonFrameButton text={"Concluir aula"} />
                </div>
            </section>
            <br />
            <Test />
        </div>
    );
}
