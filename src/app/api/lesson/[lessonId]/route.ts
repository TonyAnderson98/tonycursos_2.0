import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { lessonId: string } }
) {
    const { lessonId } = await params;

    const query = `
    SELECT * FROM lessons
    WHERE id = $1`;

    try {
        const result = await pool.query(query, [lessonId]);
        return NextResponse.json(result.rows[0]);
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
