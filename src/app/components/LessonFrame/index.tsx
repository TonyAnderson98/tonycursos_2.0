"use client";
import React, { useState, useEffect } from "react";
import LessonFrameButton from "../LessonFrameButton";
import styles from "./styles.module.css";
import Test from "../Test";
import { useSession } from "next-auth/react";

interface LessonData {
    id: number;
    lesson_name: string;
    lesson_description: string;
    video_url?: string;
    lesson_video_id: string;
}

interface LessonFrameProps {
    lessonId: string;
    onLessonCompleted: () => Promise<void>;
    initialCompleted: boolean;
}

export default function LessonFrame({
    lessonId,
    onLessonCompleted,
    initialCompleted
}: LessonFrameProps) {
    const { data: session } = useSession();
    const [lessonData, setLessonData] = useState<LessonData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isCompleted, setIsCompleted] = useState(initialCompleted);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/lesson/${lessonId}`);
                if (!response.ok) throw new Error("Failed to fetch lesson");
                const data = await response.json();
                setLessonData(data);
            } catch (error) {
                console.error("Error fetching lesson:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLessonData();
    }, [lessonId]);

    const handleCompleteLesson = async () => {
        if (!session?.user?.id || isUpdating) return;

        setIsUpdating(true);
        const newCompletedState = !isCompleted;

        try {
            // Otimistic UI update
            setIsCompleted(newCompletedState);

            const response = await fetch('/api/progress/complete-lesson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: session.user.id,
                    lessonId,
                    isCompleted: !newCompletedState // Envia o estado atual (antes da mudança)
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update lesson completion");
            }

            // Atualiza os dados do módulo
            await onLessonCompleted();
        } catch (error) {
            console.error("Error updating lesson completion:", error);
            // Reverte em caso de erro
            setIsCompleted(!newCompletedState);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Carregando aula...</div>;
    }

    if (!lessonData) {
        return <div className={styles.error}>Não foi possível carregar os dados da aula</div>;
    }

    return (
        <div className={styles.lesson__container}>
            <div className={styles.video__container}>
                <iframe
                    width="100%"
                    height="500"
                    src={`https://www.youtube.com/embed/${lessonData.lesson_video_id}`}
                    title={lessonData.lesson_name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            <section className={styles.lesson__details}>
                <div className={styles.lesson__info}>
                    <h2 className={styles.lesson__title}>{lessonData.lesson_name}</h2>
                    <p className={styles.lesson__description}>{lessonData.lesson_description}</p>
                </div>

                <div className={styles.lesson__actions}>
                    <LessonFrameButton
                        text={isCompleted ? "Aula concluída" : "Concluir aula"}
                        onClick={handleCompleteLesson}
                        disabled={isUpdating}
                    />
                </div>
            </section>

            <Test />
        </div>
    );
}