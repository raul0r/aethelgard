/**
 * 📜 The Sacred Schema of Aethelgard
 * This file defines the structure of the user's "Memory File."
 */

export type StatCategory = 'Vitality' | 'Wisdom' | 'Fortune' | 'Charisma';

export type QuestDifficulty = 'Trivial' | 'Easy' | 'Medium' | 'Hard' | 'Epic' | 'Legendary';

export type QuestStatus = 'Available' | 'In-Progress' | 'Completed' | 'Failed' | 'Abandoned';

export interface Quest {
  id: string;
  title: string;
  description?: string;
  category: StatCategory;
  difficulty: QuestDifficulty;
  status: QuestStatus;
  xpReward: number;
  goldReward: number;
  dueDate?: string; // ISO string
  isRecurring: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly';
  createdAt: string;
  completedAt?: string;
}

export interface Ritual {
  id: string;
  name: string;
  category: StatCategory;
  currentStreak: number;
  lastCompleted?: string; // ISO date
  xpValue: number;
}

export interface CharacterStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  gold: number;
  attributes: Record<StatCategory.toLowerCase() & string, number>;
  class: string;
  title: string;
}

export interface NarrativeContext {
  currentArc: string;
  longTermGoals: string[];
  dmNotes: string; // This is where the AI stores its "vibe" of the player
  lastAIGeneratedReview?: string;
}

export interface MemoryFile {
  version: string;
  playerName: string;
  stats: CharacterStats;
  activeQuests: Quest[];
  completedQuestsCount: number;
  rituals: Ritual[];
  inventory: {
    unclaimedRewards: Array<{
      id: string;
      tier: 'Common' | 'Rare' | 'Epic' | 'Legendary';
      name: string;
      description: string;
    }>;
  };
  talents: {
    unlockedIds: string[];
  };
  narrative: NarrativeContext;
  snapshots: Array<{
    date: string;
    level: number;
    stats: Record<string, number>;
  }>;
}