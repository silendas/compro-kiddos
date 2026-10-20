import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { SITE_CONFIG } from "@data/siteConfig";

export interface BranchItem {
  id?: string;
  title: string;
  address: string;
  isHeadquarters?: boolean;
  mapsUrl?: string;
  phone?: string;
  order?: number;
  createdAt?: string | number | null;
  updatedAt?: string | number | null;
}

const COLLECTION_NAME = "branches";

export async function getBranches(): Promise<BranchItem[]> {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Fallback query tanpa orderBy jika ada dokumen yang belum memiliki field order
      const fallbackSnap = await getDocs(colRef);
      if (fallbackSnap.empty) {
        return [];
      }
      return fallbackSnap.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<BranchItem, "id">),
      }));
    }

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<BranchItem, "id">),
    }));
  } catch (error) {
    console.error("Gagal mengambil data cabang:", error);
    // Jika offline atau error, coba ambil tanpa filter
    try {
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(colRef);
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<BranchItem, "id">),
      }));
    } catch {
      return [];
    }
  }
}

export async function addBranch(
  data: Omit<BranchItem, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  const colRef = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(colRef, {
    ...data,
    isHeadquarters: !!data.isHeadquarters,
    order: data.order ?? 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateBranch(
  id: string,
  data: Partial<Omit<BranchItem, "id" | "createdAt" | "updatedAt">>
): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteBranch(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

export async function seedInitialBranches(): Promise<number> {
  const defaults = SITE_CONFIG.branches;
  let count = 0;
  for (let i = 0; i < defaults.length; i++) {
    const item = defaults[i];
    await addBranch({
      title: item.title,
      address: item.address,
      isHeadquarters: !!item.isHeadquarters,
      order: i + 1,
    });
    count++;
  }
  return count;
}
