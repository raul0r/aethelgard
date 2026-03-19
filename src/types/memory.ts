export type QuestDifficulty = 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Epic' | 'Legendary';
export type StatCategory = 'Vitality' | 'Wisdom' | 'Fortune' | 'Charisma';
export type QuestStatus = 'In-Progress' | 'Completed' | 'Failed';

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: StatCategory;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  xpReward: number;
  goldReward: number;
  isRecurring: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface UserStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  gold: number;
  title: string;
  class?: string;
  attributes: {
    vitality: number;
    wisdom: number;
    fortune: number;
    charisma: number;
  };
}

export interface UserMemory {
  playerName: string;
  playerClass: string;
  stats: UserStats;
  activeQuests: Quest[];
  completedQuests: Quest[];
  narrative: {
    currentArc: string;
    logs: string[];
  };
}

/** Flat structure used by the store and app (matches initialMemory) */
export interface MemoryFile {
  version: string;
  playerName: string;
  stats: UserStats;
  activeQuests: Quest[];
  completedQuestsCount: number;
  rituals: unknown[];
  inventory: { unclaimedRewards: unknown[] };
  talents: { unlockedIds: string[] };
  narrative: {
    currentArc: string;
    longTermGoals: string[];
    dmNotes: string;
  };
  snapshots: unknown[];
}