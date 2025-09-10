// FIX: Populated empty types.ts with necessary type definitions and exports to make it a module.
import React from 'react';

export const Village = {
  Konoha: "ورقة الشجر",
  Suna: "الرمل",
  Kiri: "الضباب",
  Iwa: "الصخر",
  Kumo: "السحاب",
  Oto: "الصوت",
  Ame: "المطر",
  Akatsuki: "الأكاتسوكي"
} as const;

export const Rank = {
  Kage: "كاجي",
  Sannin: "سانين",
  Jonin: "جونين",
  Chunin: "تشونين",
  Genin: "جينين",
  Anbu: "أنبو",
  MissingNin: "نينجا هارب",
  Civilian: "مدني"
} as const;

type VillageKeys = keyof typeof Village;
export type Village = typeof Village[VillageKeys];

type RankKeys = keyof typeof Rank;
export type Rank = typeof Rank[RankKeys];

export interface Character {
  id: number;
  name: string;
  emoji: string;
  village: Village;
  rank: Rank;
  abilities: string[];
  powerLevel: number;
  quote: string;
  techniques: string[];
  age: string;
  fatherName: string;
  team: string[];
}

export interface Arc {
    id: number;
    name: string;
    episodeRange: string;
    emoji: string;
    summary: string;
}

export interface Eye {
    id: number;
    name: string;
    description: string;
    summary: string;
    svg: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Clan {
    id: number;
    name: string;
    symbol: React.FC<React.SVGProps<SVGSVGElement>>;
    history: string;
    members: string[];
    summary: string;
}

export type FavoriteCategory = 'characters' | 'arcs' | 'eyes' | 'clans';
export type FavoriteItem = Character | Arc | Eye | Clan;

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    hint: string;
}
