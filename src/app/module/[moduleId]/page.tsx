"use client";
import styles from "./styles.module.css";
import LessonFrame from "@/app/components/LessonFrame";
import React, { use, useState, useEffect } from "react";

interface Lesson {
    lesson_id: number;
    lesson_name: string;
    params: string;
}

interface ModuleData {
    id: number;
    module_name: string;
    module_description: string;
    lessons: Lesson[];
}

export default function Module({
    params,
}: {
    params: Promise<{ moduleId: string }>;
}) {
    const { moduleId } = use(params);

    const [moduleData, setModuleData] = useState<ModuleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(
        null
    );

    useEffect(() => {
        const fetchModuleId = async (moduleId: string) => {
            try {
                const response = await fetch(`/api/module/${moduleId}`);
                const data = await response.json();
                setModuleData(data);

                // Seleciona a 1ª aula por padrão
                setSelectedLessonId(data.lessons[0].lesson_id.toString());
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchModuleId(moduleId);
    }, [moduleId]);

    if (loading) return <div>Carregando...</div>;

    return (
        <main className={styles.main}>
            <section className={styles.module__page__container}>
                <div className={styles.module__header}>
                    <div>
                        <h1 className={styles.module__description}>
                            {moduleData.module_description}
                        </h1>
                        <h3 className={styles.module__title}>
                            {moduleData.module_name}
                        </h3>
                    </div>
                    <div
                        style={{
                            width: "120px",
                            height: "120px",
                            backgroundColor: "green",
                            borderRadius: "100%",
                        }}
                    ></div>
                </div>

                <div className={styles.module__lessons__list}>
                    <h2 className={styles.lessons__label}>Aulas</h2>
                    {moduleData.lessons.map((lesson) => (
                        <div
                            className={styles.lesson__item}
                            key={lesson.lesson_id}
                            onClick={() =>
                                setSelectedLessonId(lesson.lesson_id.toString())
                            }
                        >
                            {lesson.lesson_name}
                        </div>
                    ))}
                </div>
            </section>
            <section className={styles.lesson_frame__container}>
                {selectedLessonId && (
                    <LessonFrame lessonId={selectedLessonId} />
                )}
            </section>
        </main>
    );
}
