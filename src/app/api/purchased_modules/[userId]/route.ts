import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;

    const query = `
    SELECT
    user_id,
    jsonb_agg(
        jsonb_build_object(
            'module_id', module_id,
            'purchased_at', purchased_at,
            'expires_at', expires_at,
            'status',
            CASE
                WHEN expires_at >= NOW() THEN 'ativo'
                ELSE 'expirado'
            END
        ) ORDER BY module_id
    ) AS purchased_modules
FROM purchased_modules
WHERE user_id = $1
GROUP BY user_id`

    try {
        const result = await pool.query(query, [userId]);
        return NextResponse.json(result.rows[0]);
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}
