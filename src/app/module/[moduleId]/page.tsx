"use client";
import { useSession } from "next-auth/react";
import LessonFrame from "@/app/components/LessonFrame";
import { use, useState, useEffect, useCallback } from "react";
import styles from './styles.module.css';
import ProgressDonut from "@/app/ProgressDonut";

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

interface ProgressResponse {
    completed_lesson_ids: number[];
    total_lessons: string;
    total_completed_lessons: string;
}

export default function Module({
    params,
}: {
    params: Promise<{ moduleId: string }>;
}) {
    const { moduleId } = use(params);
    const { data: session, status } = useSession();

    const [moduleData, setModuleData] = useState<ModuleData | null>(null);
    const [progressData, setProgressData] = useState<ProgressResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchModuleData = useCallback(async (id: string) => {
        const response = await fetch(`/api/module/${id}`);
        if (!response.ok) throw new Error("Falha ao carregar módulo");
        return await response.json();
    }, []);

    const fetchProgressData = useCallback(async (moduleId: string, userId: string) => {
        const response = await fetch(`/api/progress/completed-lessons/${moduleId}/${userId}`);
        if (!response.ok) throw new Error("Falha ao carregar progresso");
        return await response.json() as ProgressResponse;
    }, []);

    const loadData = useCallback(async () => {
        if (!session?.user?.id) return;

        try {
            setLoading(true);
            setError(null);

            const [module, progress] = await Promise.all([
                fetchModuleData(moduleId),
                fetchProgressData(moduleId, session.user.id)
            ]);

            setModuleData(module);
            setProgressData(progress);

            if (module.lessons?.length > 0 && !selectedLessonId) {
                setSelectedLessonId(module.lessons[0].lesson_id.toString());
            }
        } catch (err) {
            console.error("Erro ao carregar dados:", err);
            setError("Erro ao carregar dados. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }, [moduleId, session?.user?.id, fetchModuleData, fetchProgressData, selectedLessonId]);

    const refreshProgress = useCallback(async () => {
        if (!session?.user?.id) return;

        try {
            setIsRefreshing(true);
            const progress = await fetchProgressData(moduleId, session.user.id);
            setProgressData(progress);
        } catch (err) {
            console.error("Erro ao atualizar progresso:", err);
        } finally {
            setIsRefreshing(false);
        }
    }, [moduleId, session?.user?.id, fetchProgressData]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    if (status === "loading") return <div className={styles.loading}>Verificando autenticação...</div>;
    if (status === "unauthenticated") return <div className={styles.error}>Por favor, faça login para acessar este módulo</div>;
    if (loading) return <div className={styles.loading}>Carregando...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!moduleData) return <div className={styles.error}>Nenhum dado encontrado</div>;
    if (!progressData) return <div className={styles.loading}>Carregando progresso...</div>;

    const isLessonCompleted = (lessonId: number) => {
        return progressData.completed_lesson_ids.includes(lessonId);
    };

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
                        <span>
                            {progressData.total_completed_lessons}/{progressData.total_lessons} aulas completas
                        </span>
                    </div>
                    <div className={styles.progress_circle}>
                        <ProgressDonut
                            completed={Number(progressData.total_completed_lessons)}
                            total={Number(progressData.total_lessons)}
                        />
                    </div>
                </div>

                <div className={styles.module__lessons__list}>
                    <h2 className={styles.lessons__label}>Aulas</h2>
                    {moduleData.lessons.map((lesson) => (
                        <div
                            key={lesson.lesson_id}
                            className={`${styles.lesson__item} ${selectedLessonId === lesson.lesson_id.toString() ? styles.active : ''
                                }`}
                            onClick={() => setSelectedLessonId(lesson.lesson_id.toString())}
                        >
                            {isLessonCompleted(lesson.lesson_id) && (
                                <span className={styles.completed_badge}>
                                    {isRefreshing && selectedLessonId === lesson.lesson_id.toString()
                                        ? '⌛'
                                        : '✔'}
                                </span>
                            )}
                            {lesson.lesson_name}
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.lesson_frame__container}>
                {selectedLessonId && (
                    <LessonFrame
                        lessonId={selectedLessonId}
                        onLessonCompleted={refreshProgress}
                        initialCompleted={isLessonCompleted(Number(selectedLessonId))}
                    />
                )}
            </section>
        </main>
    );
}