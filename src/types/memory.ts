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

// Ensure the file ends with a clean export if needed, 
// but usually just the interfaces are enough.