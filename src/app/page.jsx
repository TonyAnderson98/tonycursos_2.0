"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

export default function Home() {
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchChapters = async () => {
            const response = await fetch("/api/chapters");

            const data = await response.json();
            setChapters(data);
        };

        fetchChapters();
    }, []);

    return (
        <main className={styles.main}>
            {chapters.map((chapter) => (
                <div key={chapter.chapter_id}>
                    <h1 className={styles.chapter__name}>
                        {chapter.chapter_name}
                    </h1>
                    <h3 className={styles.chapter__description}>
                        {chapter.chapter_description}
                    </h3>
                    <hr className={styles.hr} />
                    <section className={styles.module__container}>
                        {chapter.modules.map((module) => (
                            <div key={module.module_id}>
                                <Image
                                    src={module.module_cover}
                                    width={250}
                                    height={500}
                                    alt="50"
                                    layout="resposive"
                                />
                            </div>
                        ))}
                    </section>
                    <br />
                </div>
            ))}
        </main>
    );
}
