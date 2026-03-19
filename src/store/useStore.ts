import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MemoryFile, Quest, StatCategory, QuestDifficulty } from '../types/memory';

interface AethelgardState {
  memory: MemoryFile;
  
  // Actions: The "Spells" that change the state
  setPlayerName: (name: string) => void;
  addQuest: (quest: Quest) => void;
  completeQuest: (questId: string) => void;
  updateStats: (category: StatCategory, amount: number) => void;
  addXp: (amount: number) => void;
  
  // Persistence Helpers
  importMemory: (file: MemoryFile) => void;
  resetMemory: () => void;
}

// Initial "New Game" State
const initialMemory: MemoryFile = {
  version: '1.0.0',
  playerName: 'Traveler',
  stats: {
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    gold: 0,
    attributes: { vitality: 10, wisdom: 10, fortune: 10, charisma: 10 },
    class: 'Novice',
    title: 'The Awakened',
  },
  activeQuests: [],
  completedQuestsCount: 0,
  rituals: [],
  inventory: { unclaimedRewards: [] },
  talents: { unlockedIds: [] },
  narrative: {
    currentArc: 'The Beginning of the Journey',
    longTermGoals: [],
    dmNotes: 'A new soul has entered the realm of Aethelgard.',
  },
  snapshots: [],
};

export const useStore = create<AethelgardState>()(
  persist(
    (set) => ({
      memory: initialMemory,

      setPlayerName: (name) => 
        set((state) => ({ memory: { ...state.memory, playerName: name } })),

      addQuest: (quest) =>
        set((state) => ({
          memory: { ...state.memory, activeQuests: [...state.memory.activeQuests, quest] },
        })),

      completeQuest: (questId) =>
        set((state) => {
          const quest = state.memory.activeQuests.find((q: Quest) => q.id === questId);
          if (!quest) return state;

          const updatedQuests = state.memory.activeQuests.filter((q: Quest) => q.id !== questId);
          
          return {
            memory: {
              ...state.memory,
              activeQuests: updatedQuests,
              completedQuestsCount: state.memory.completedQuestsCount + 1,
              stats: {
                ...state.memory.stats,
                xp: state.memory.stats.xp + quest.xpReward,
                gold: state.memory.stats.gold + quest.goldReward,
              },
            },
          };
        }),

      addXp: (amount) =>
        set((state) => {
          let { xp, level, nextLevelXp } = state.memory.stats;
          xp += amount;
          
          // Basic Level Up Logic (n^2 * 50)
          while (xp >= nextLevelXp) {
            xp -= nextLevelXp;
            level += 1;
            nextLevelXp = level * level * 50 + level * 50;
          }

          return {
            memory: {
              ...state.memory,
              stats: { ...state.memory.stats, xp, level, nextLevelXp },
            },
          };
        }),

      updateStats: (category, amount) =>
        set((state) => ({
          memory: {
            ...state.memory,
            stats: {
              ...state.memory.stats,
              attributes: {
                ...state.memory.stats.attributes,
                [category.toLowerCase()]: (state.memory.stats.attributes[category.toLowerCase() as keyof typeof state.memory.stats.attributes] || 0) + amount,
              },
            },
          },
        })),

      importMemory: (file) => set({ memory: file }),
      
      resetMemory: () => set({ memory: initialMemory }),
    }),
    {
      name: 'aethelgard-memory', // This is the key in LocalStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);