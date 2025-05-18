// /api/progress/complete-lesson/route.ts
import pool from "@/lib/db";
import { NextResponse } from "next/server";

interface RequestBody {
    userId: string;
    lessonId: string;
    isCompleted: boolean;
}

export async function POST(req: Request) {
    const { userId, lessonId, isCompleted }: RequestBody = await req.json();

    console.log("Requisição recebida em /api/progress/complete-lesson:", {
        userId,
        lessonId,
        isCompleted,
    });

    try {
        if (isCompleted) {
            const deleteResult = await pool.query(
                "DELETE FROM completed_lessons WHERE user_id = $1 AND lesson_id = $2 RETURNING *",
                [userId, lessonId]
            );
            console.log("Resultado do DELETE:", deleteResult.rows);
            return NextResponse.json({
                message: "Aula desmarcada como concluída!",
            });
        } else {
            const insertResult = await pool.query(
                "INSERT INTO completed_lessons (user_id, lesson_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *",
                [userId, lessonId]
            );
            console.log("Resultado do INSERT:", insertResult.rows);
            return NextResponse.json({
                message: "Aula marcada como concluída!",
            });
        }
    } catch (err) {
        console.error("Erro ao alternar conclusão da aula:", err);
        return NextResponse.json(
            { error: "Erro ao alternar conclusão." },
            { status: 500 }
        );
    }
}
