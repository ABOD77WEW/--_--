
import type React from 'react';

export enum Village {
  Konoha = "ورقة الشجر",
  Suna = "الرمل",
  Kiri = "الضباب",
  Iwa = "الصخر",
  Kumo = "السحاب",
  Oto = "الصوت",
  Ame = "المطر",
  Akatsuki = "الأكاتسوكي"
}

export enum Rank {
  Kage = "كاجي",
  Sannin = "سانين",
  Jonin = "جونين",
  Chunin = "تشونين",
  Genin = "جينين",
  Anbu = "أنبو",
  MissingNin = "نينجا هارب",
  Civilian = "مدني"
}

export interface Character {
  id: number;
  name: string;
  emoji: string;
  village: Village;
  rank: Rank;
  abilities: string[];
  powerLevel: number; // 1-10 scale
  quote: string;
  techniques: string[]; // Emojis: 🔥 💧 ⚡️ 🌍 💨
  age: string;
  fatherName: string;
  team: string[];
}

export interface Arc {
  id: number;
  name:string;
  episodeRange: string;
  emoji: string;
  summary: string;
}

export interface Eye {
  id: number;
  name: string;
  description: string;
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  summary: string;
}

export interface Clan {
  id: number;
  name: string;
  symbol: React.FC<React.SVGProps<SVGSVGElement>>;
  history: string;
  members: string[];
  summary: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export type FavoriteItem = Character | Arc | Eye | Clan;

export type FavoriteCategory = 'characters' | 'arcs' | 'eyes' | 'clans';