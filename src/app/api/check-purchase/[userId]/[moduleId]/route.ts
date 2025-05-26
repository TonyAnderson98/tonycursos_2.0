import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string; moduleId: string } > }
) {
    const { userId } = await params;
    const { moduleId } = await params;

    const query = `
    SELECT 1
    FROM purchased_modules
    WHERE user_id= $1 AND module_id = $2;`;

    try {
        const result = await pool.query(query, [userId, moduleId]);

        return NextResponse.json({ purchased: result.rows.length > 0 });
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}