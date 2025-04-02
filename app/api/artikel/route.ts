import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  limit,
  Timestamp,
} from "firebase/firestore";

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");

    const articleLimit = limitParam ? parseInt(limitParam, 10) : null;

    let q;
    if (articleLimit && !isNaN(articleLimit)) {
      q = query(
        collection(db, "artikel"),
        orderBy("createdAt", "desc"),
        limit(articleLimit)
      );
    } else {
      q = query(collection(db, "artikel"), orderBy("createdAt", "desc"));
    }

    const querySnapshot = await getDocs(q);
    const articles: Article[] = [];

    querySnapshot.forEach((docSnap) => {
      articles.push({ id: docSnap.id, ...docSnap.data() } as Article);
    });

    return NextResponse.json({ articles });
  } catch (error: unknown) {
    console.error("Error GET artikel:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
    const newArticle = {
      title,
      content,
      createdAt: Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(collection(db, "artikel"), newArticle);
    return NextResponse.json({ id: docRef.id, ...newArticle });
  } catch (error: unknown) {
    console.error("Error POST artikel:", error);
    return NextResponse.error();
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "ID artikel tidak ditemukan" },
        { status: 400 }
      );
    }
    await deleteDoc(doc(db, "artikel", id));
    return NextResponse.json({ message: "Artikel dihapus" });
  } catch (error: unknown) {
    console.error("Error DELETE artikel:", error);
    return NextResponse.error();
  }
}
