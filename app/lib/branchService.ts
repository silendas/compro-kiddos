import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
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

let branchCache: { data: BranchItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 2 * 60 * 1000;

export function invalidateBranchCache() {
  branchCache = null;
}

export async function getBranches(): Promise<BranchItem[]> {
  const now = Date.now();
  if (branchCache && now - branchCache.timestamp < CACHE_TTL_MS) {
    return branchCache.data;
  }

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      return [];
    }

    const items: BranchItem[] = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || "",
        address: data.address || "",
        isHeadquarters: !!data.isHeadquarters,
        mapsUrl: data.mapsUrl || "",
        phone: data.phone || "",
        order: Number(data.order) || 0,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : null,
      };
    });

    items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    branchCache = { data: items, timestamp: now };
    return items;
  } catch (error) {
    console.error("Gagal mengambil data cabang:", error);
    return branchCache ? branchCache.data : [];
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
  invalidateBranchCache();
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
  invalidateBranchCache();
}

export async function deleteBranch(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
  invalidateBranchCache();
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
  invalidateBranchCache();
  return count;
}
