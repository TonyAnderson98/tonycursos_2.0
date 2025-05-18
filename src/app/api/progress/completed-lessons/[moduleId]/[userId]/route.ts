import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ moduleId: string; userId: string }> }
) {
    const { moduleId, userId } = await params;

    const query = `
    SELECT 
        COALESCE(array_agg(cl.lesson_id), '{}') AS completed_lesson_ids,
        COUNT(l.id) AS total_lessons,
        COUNT(cl.lesson_id) AS total_completed_lessons
    FROM
        lessons l
    LEFT JOIN
        completed_lessons cl ON l.id = cl.lesson_id AND cl.user_id = $2
    WHERE
        l.module_id = $1;


    `;

    try {
        const result = await pool.query(query, [moduleId, userId]);
        return NextResponse.json(result.rows[0]);
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}
