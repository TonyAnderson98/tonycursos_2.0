"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";

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
                            <div key={module.module_id} className={styles.module__card}>
                                <Link href={`/module/${module.module_id}`} className={styles.module__link}>
                                    <Image
                                        src={module.module_cover}
                                        width={250}
                                        height={500}
                                        alt="50"
                                        layout="resposive"
                                        className={styles.module__image}
                                    />
                                    <div className={styles.module__overlay}> 
                                        <span className={styles.overlay__title}>{module.module_name}</span>
                                        <span className={styles.overlay__description}>{module.module_description}</span>
                                        <span className={styles.overlay__difficulty}>{chapter.chapter_difficulty}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </section>
                    <br />
                </div>
            ))}
        </main>
    );
}
