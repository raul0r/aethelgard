import { useStore } from '../store/useStore';
import { QuestDifficulty } from '../types/memory';

/**
 * 🎲 The Loot Engine
 * Handles the variable reward logic (70/30 chance)
 */

export const useLoot = () => {
  const { memory } = useStore();
  const { fortune } = memory.stats.attributes;

  const rollForLoot = (difficulty: QuestDifficulty) => {
    // 1. Base Success Chance (70%)
    let successChance = 0.70;

    // 2. Apply Difficulty Modifiers (from the article)
    const difficultyMods: Record<QuestDifficulty, number> = {
      'Trivial': -0.20,   // 50% chance
      'Easy': -0.10,      // 60% chance
      'Medium': 0.0,      // 70% chance
      'Hard': +0.10,      // 80% chance
      'Epic': +0.20,      // 90% chance
      'Legendary': 1.0,   // Guaranteed (100%+)
    };

    successChance += difficultyMods[difficulty];

    // 3. Apply Fortune Modifier (0.5% per point above 10)
    if (fortune > 10) {
      successChance += (fortune - 10) * 0.005;
    }

    // 4. The "Final Roll"
    const roll = Math.random();
    const isSuccess = roll <= successChance;

    if (!isSuccess) {
      return {
        didWin: false,
        message: "The fates were not generous... but your XP is eternal.",
        tier: null,
      };
    }

    // 5. If Success, determine Reward Tier
    // (Common: 50%, Uncommon: 30%, Rare: 15%, Epic: 4%, Legendary: 1%)
    const tierRoll = Math.random() * 100;
    
    if (tierRoll <= 1) return { didWin: true, tier: 'Legendary', color: '#ff8000' };
    if (tierRoll <= 5) return { didWin: true, tier: 'Epic', color: '#a335ee' };
    if (tierRoll <= 20) return { didWin: true, tier: 'Rare', color: '#0070dd' };
    if (tierRoll <= 50) return { didWin: true, tier: 'Uncommon', color: '#1eff00' };
    
    return { didWin: true, tier: 'Common', color: '#ffffff' };
  };

  return { rollForLoot };
};