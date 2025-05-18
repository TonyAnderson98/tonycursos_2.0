import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ moduleId: string }> }
) {
    const { moduleId } = await params;

    const query = `
    SELECT m.id, m.module_name, m.module_description,
    jsonb_agg(
        jsonb_build_object(
            'lesson_id', l.id,
            'lesson_name', l.lesson_name
        )
    ) as lessons
    FROM modules m
    LEFT JOIN lessons l ON m.id = l.module_id
    WHERE m.id = $1
    GROUP BY m.id, m.module_name
    `;

    try {
        const result = await pool.query(query, [moduleId]);
        return NextResponse.json(result.rows[0]);
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
