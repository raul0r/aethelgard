import { QuestDifficulty, StatCategory } from '../types/memory';
import { useStore } from '../store/useStore';

/**
 * ⚖️ The Great Ledger (RPG Math Hook)
 * Calculates XP, Gold, and Leveling logic based on the PRD.
 */

export const useRPGMath = () => {
  const { memory, addXp, updateStats } = useStore();

  /**
   * 💰 Reward Table: Maps Difficulty to Base Rewards
   */
  const REWARD_TABLE: Record<QuestDifficulty, { xp: number; gold: number }> = {
    'Trivial':   { xp: 10,  gold: 2   },
    'Easy':      { xp: 25,  gold: 5   },
    'Medium':    { xp: 50,  gold: 15  },
    'Hard':      { xp: 100, gold: 40  },
    'Epic':      { xp: 250, gold: 100 },
    'Legendary': { xp: 500, gold: 250 }
  };

  /**
   * ✨ Calculate Final Rewards (Including Multipliers)
   */
  const calculateRewards = (difficulty: QuestDifficulty, category: StatCategory) => {
    let base = REWARD_TABLE[difficulty];
    
    // Streak Bonus: +10% per consecutive day (Cap at +100%)
    // (Logic for checking streaks would happen here)
    const streakMultiplier = 1.0; 

    // Talent Multipliers: (e.g. Path of Wisdom +20% for Wisdom Quests)
    const talentMultiplier = 1.0; 

    return {
      xp: Math.floor(base.xp * streakMultiplier * talentMultiplier),
      gold: Math.floor(base.gold * talentMultiplier),
    };
  };

  /**
   * 📈 Level Formula: n^2 * 50 + n * 50
   * This calculates the TOTAL XP required for a specific level.
   */
  const getXpForLevel = (level: number) => {
    return (Math.pow(level, 2) * 50) + (level * 50);
  };

  /**
   * 🛠️ Process Completion
   * This ties the UI action to the State update.
   */
  const processQuestCompletion = (difficulty: QuestDifficulty, category: StatCategory) => {
    const rewards = calculateRewards(difficulty, category);
    
    // 1. Add the XP (The Store handles the Level Up check)
    addXp(rewards.xp);
    
    // 2. Add the Attribute Point (+1 to the relevant Stat)
    updateStats(category, 1);

    return rewards;
  };

  return { calculateRewards, getXpForLevel, processQuestCompletion };
};