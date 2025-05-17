"use client";
import React, { useState, useEffect } from "react";

interface LessonData {
    id: number;
    lesson_name: string;
    lesson_description: string;
    video_url?: string;
}

export default function LessonFrame({ lessonId }: { lessonId: string }) {
    const [lessonData, setLessonData] = useState<LessonData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        <div className="lesson-frame">
            <div>
                <iframe
                    width="1000"
                    height="563"
                    src={`https://www.youtube.com/embed/ID_VIDEO`}
                    title="Title"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <h2>{lessonData.lesson_name}</h2>
            <p>{lessonData.lesson_description}</p>
        </div>
    );
}
