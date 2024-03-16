import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/api/utils/postgres";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const deleteQuery = `DELETE FROM chat_threads WHERE id = ${body.id}`;

    await pool.query(deleteQuery);

    return NextResponse.json(
      { message: "Chat eliminata con successo" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { message: "Errore durante la eliminazione" },
      { status: 500 },
    );
  }
}
