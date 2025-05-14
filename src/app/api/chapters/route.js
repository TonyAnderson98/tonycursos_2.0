import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const query = `
        SELECT 
            c.id as chapter_id,
            c.chapter_name,
            c.chapter_cover,
            c.chapter_difficulty,
            c.chapter_description,
            jsonb_agg(
                jsonb_build_object(
                    'module_id', m.id,
                    'module_name', m.module_name,
                    'module_cover', m.module_cover,
                    'module_description', m.module_description
                ) ORDER BY m.id
            ) AS modules
        FROM 
            chapters c
        LEFT JOIN 
            modules m ON c.id = m.chapter_id
        GROUP BY 
            c.id, c.chapter_name, c.chapter_description
        ORDER BY 
            c.id`;

    try {
        const result = await pool.query(query);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Erro ao buscar capítulos" },
            { status: 500 }
        );
    }
}
