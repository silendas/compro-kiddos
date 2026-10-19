import {
  guru1,
  guru2,
  guru3,
  guru4,
  guru5,
  guru6,
  guru7,
  guru8,
  guru9,
  guru10,
} from "@asset/teacher";
import { StaticImageData } from "next/image";

export interface TeacherItem {
  name: string;
  subject: string;
  img: StaticImageData | string;
}

export const TEACHER_LIST: TeacherItem[] = [
  { name: "Ibu Frida", subject: "Guru PraCalis & Calistung", img: guru1 },
  { name: "Ms Deti", subject: "Guru Bahasa Inggris", img: guru2 },
  { name: "Ibu Hana", subject: "Guru BTQ & Mapel Matematika", img: guru3 },
  { name: "Ms Dhifa", subject: "Guru Bahasa Inggris", img: guru4 },
  { name: "Ms Rara", subject: "Guru Prisma Kalkulator Tangan", img: guru5 },
  { name: "Ibu Dewi", subject: "Guru Calistung & Prisma", img: guru6 },
  {
    name: "Ibu Indri Dewi",
    subject: "Guru Private Calistung & BTQ",
    img: guru7,
  },
  { name: "Ms Tanti", subject: "Guru Calistung & BTQ", img: guru8 },
  { name: "Ms Icha", subject: "Guru PraCalis & Calistung", img: guru9 },
  { name: "Ibu Reni", subject: "Guru Calistung & Prisma", img: guru10 },
];
