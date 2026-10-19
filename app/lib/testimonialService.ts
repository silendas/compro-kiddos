import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { TESTIMONIALS_DATA, TestimonialItem } from "@data/testimonials";

export interface Testimonial extends TestimonialItem {
  createdAt?: string | number | null;
}

const COLLECTION_NAME = "testimonials";

/**
 * Fetch all testimonials from Firestore.
 * Falls back to local curated testimonials if Firestore collection is empty or offline.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Also try without orderBy in case documents lack createdAt
      const fallbackSnap = await getDocs(collection(db, COLLECTION_NAME));
      if (!fallbackSnap.empty) {
        return fallbackSnap.docs.map((d) => ({
          id: d.id,
          name: d.data().name || "Orang Tua Siswa",
          role: d.data().role || "Orang Tua Siswa",
          content: d.data().content || "",
          rating: Number(d.data().rating) || 5,
          program: d.data().program || "",
          avatar: d.data().avatar || "",
          avatarBg: d.data().avatarBg || "from-pink-400 to-rose-400",
          createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
        }));
      }
      return TESTIMONIALS_DATA;
    }

    return snapshot.docs.map((d) => ({
      id: d.id,
      name: d.data().name || "Orang Tua Siswa",
      role: d.data().role || "Orang Tua Siswa",
      content: d.data().content || "",
      rating: Number(d.data().rating) || 5,
      program: d.data().program || "",
      avatar: d.data().avatar || "",
      avatarBg: d.data().avatarBg || "from-pink-400 to-rose-400",
      createdAt: d.data().createdAt?.toDate ? d.data().createdAt.toDate().toISOString() : null,
    }));
  } catch (error) {
    console.warn("Firestore testimonials offline/unavailable, using local fallback:", error);
    return TESTIMONIALS_DATA;
  }
}

/**
 * Add a new testimonial to Firestore.
 */
export async function addTestimonial(
  data: Omit<Testimonial, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    name: data.name.trim(),
    role: data.role.trim(),
    content: data.content.trim(),
    rating: Number(data.rating) || 5,
    program: data.program?.trim() || "",
    avatarBg: data.avatarBg || "from-pink-400 to-rose-400",
    avatar: data.avatar || "",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Update an existing testimonial in Firestore.
 */
export async function updateTestimonial(
  id: string,
  data: Partial<Omit<Testimonial, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a testimonial by ID.
 */
export async function deleteTestimonial(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

/**
 * Helper to seed the initial testimonials into Firestore with 1-click.
 */
export async function seedInitialTestimonials(): Promise<number> {
  let count = 0;
  for (const item of TESTIMONIALS_DATA) {
    await addDoc(collection(db, COLLECTION_NAME), {
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating,
      program: item.program || "",
      avatarBg: item.avatarBg || "from-pink-400 to-rose-400",
      createdAt: serverTimestamp(),
    });
    count++;
  }
  return count;
}
