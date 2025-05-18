// app/api/progress/check-lesson/[lessonId]/[userId]/route.ts
import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { lessonId: string; userId: string } }
) {
    const { lessonId, userId } = await params;

    try {
        const result = await pool.query(
            `SELECT 1 FROM completed_lessons 
       WHERE user_id = $1 AND lesson_id = $2`,
            [userId, lessonId]
        );

        return NextResponse.json({
            isCompleted: result.rowCount > 0,
        });
    } catch (err) {
        console.error("Erro ao verificar aula concluída:", err);
        return NextResponse.json(
            { error: "Erro ao verificar progresso." },
            { status: 500 }
        );
    }
}
