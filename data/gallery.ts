import {
  galeri1,
  galeri2,
  galeri3,
  galeri4,
  galeri5,
  galeri6,
  galeri7,
  galeri8,
  galeri9,
  galeri10,
  galeri11,
  galeri12,
  galeri13,
  galeri14,
  galeri15,
} from "@asset/galery";
import { StaticImageData } from "next/image";

export interface GalleryItem {
  id: number;
  title: string;
  img: StaticImageData | string;
}

export const GALLERY_LIST: GalleryItem[] = [
  { id: 1, title: "Kegiatan Belajar Siswa 1", img: galeri1 },
  { id: 2, title: "Kegiatan Belajar Siswa 2", img: galeri2 },
  { id: 3, title: "Kegiatan Belajar Siswa 3", img: galeri3 },
  { id: 4, title: "Kegiatan Belajar Siswa 4", img: galeri4 },
  { id: 5, title: "Kegiatan Belajar Siswa 5", img: galeri5 },
  { id: 6, title: "Kegiatan Belajar Siswa 6", img: galeri6 },
  { id: 7, title: "Kegiatan Belajar Siswa 7", img: galeri7 },
  { id: 8, title: "Kegiatan Belajar Siswa 8", img: galeri8 },
  { id: 9, title: "Kegiatan Belajar Siswa 9", img: galeri9 },
  { id: 10, title: "Kegiatan Belajar Siswa 10", img: galeri10 },
  { id: 11, title: "Kegiatan Belajar Siswa 11", img: galeri11 },
  { id: 12, title: "Kegiatan Belajar Siswa 12", img: galeri12 },
  { id: 13, title: "Kegiatan Belajar Siswa 13", img: galeri13 },
  { id: 14, title: "Kegiatan Belajar Siswa 14", img: galeri14 },
  { id: 15, title: "Kegiatan Belajar Siswa 15", img: galeri15 },
];
