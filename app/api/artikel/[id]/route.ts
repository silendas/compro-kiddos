import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(
  request: Request,
  context: unknown
): Promise<Response> {
  const { params } = context as { params: { id: string } };
  try {
    const { id } = params;
    const docRef = doc(db, "artikel", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { error: "Artikel tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error("Error GET artikel by ID:", error);
    return NextResponse.json(
      { error: "Gagal mengambil artikel" },
      { status: 500 }
    );
  }
}
