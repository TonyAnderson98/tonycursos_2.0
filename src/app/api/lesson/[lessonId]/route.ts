import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint da API para buscar dados de uma aula específica
 * @param {NextRequest} request - O objeto de requisição Next.js
 * @param {Object} params - Parâmetros da rota
 * @param {string} params.lessonId - O ID da aula a ser buscada
 * @returns {Promise<NextResponse>} Resposta com os dados da aula ou erro
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ lessonId: string }> }
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
