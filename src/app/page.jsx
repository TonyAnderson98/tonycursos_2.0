"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
    const [chapters, setChapters] = useState([]);
    const [purchasedModules, setPurchasedModules] = useState({});
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchChapters = async () => {
            const response = await fetch("/api/chapters");
            const data = await response.json();
            setChapters(data);
        };

        fetchChapters();
    }, []);

    useEffect(() => {
        const fetchPurchasedModules = async (userId) => {
            const response = await fetch(`/api/purchased_modules/${userId}`);
            const data = await response.json();
            const purchasedMap = {};
            data?.purchased_modules?.forEach(module => {
                purchasedMap[module.module_id] = module.status;
            });
            setPurchasedModules(purchasedMap);
        };

        if (session?.user?.id) {
            fetchPurchasedModules(session.user.id);
        }
    }, [session?.user?.id]);

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
                                        className={styles.module__image}
                                    />
                                    <div>
                                        <span>
                                            {status === "unauthenticated" ? (
                                                "Faça login para assistir"
                                            ) : purchasedModules[module.module_id] === 'ativo' ? (
                                                "Adquirido"
                                            ) : purchasedModules[module.module_id] === 'expirado' ? (
                                                "Expirado"
                                            ) : (
                                                "Disponível"
                                            )}
                                        </span>
                                    </div>
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