// components/LessonFrameButton.tsx
"use client";
import React from "react";
import styles from "./styles.module.css";

interface LessonFrameButtonProps {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function LessonFrameButton({
    text,
    onClick,
    disabled = false
}: LessonFrameButtonProps) {
    return (
        <button
            className={styles.lesson__frame__button}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
