import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quest } from '../../types/memory';
import { useRPGMath } from '../../hooks/useRPGMath';
import { useLoot } from '../../hooks/useLoot';
import { useStore } from '../../store/useStore';

interface QuestCardProps {
  quest: Quest;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const [isSealing, setIsSealing] = useState(false);
  const { processQuestCompletion } = useRPGMath();
  const { rollForLoot } = useLoot();
  const { completeQuest } = useStore();

  const handleComplete = async () => {
    setIsSealing(true);

    // 1. Play "Stamp" sound logic would go here
    
    // 2. Wait for animation timing
    setTimeout(() => {
      // 3. Process Math & Loot
      const rewards = processQuestCompletion(quest.difficulty, quest.category);
      const lootResult = rollForLoot(quest.difficulty);

      // 4. Update Global State
      completeQuest(quest.id);

      // 5. Trigger Loot Modal (we'll build this later)
      if (lootResult.didWin) {
        console.log(`🏆 LOOT FOUND: ${lootResult.tier} Chest!`);
      }
      
      setIsSealing(false);
    }, 600);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="quest-card"
    >
      <div className="quest-content">
        <span className="quest-category">{quest.category}</span>
        <h3 className="quest-title">{quest.title}</h3>
        <p className="quest-difficulty">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={i < getDifficultyStars(quest.difficulty) ? 'star filled' : 'star'}>
              ★
            </span>
          ))}
        </p>
      </div>

      {/* 🛡️ The Wax Seal Button */}
      <button 
        className={`wax-seal ${isSealing ? 'stamped' : ''}`}
        onClick={handleComplete}
        disabled={isSealing}
      >
        <motion.div
          animate={isSealing ? { scale: [1, 1.5, 1], rotate: [0, -10, 0] } : {}}
          className="seal-inner"
        >
          {isSealing ? '✓' : ''}
        </motion.div>
      </button>
    </motion.div>
  );
};

// Helper for Star Rating
const getDifficultyStars = (diff: string) => {
  const map: Record<string, number> = { Trivial: 0, Easy: 1, Medium: 1, Hard: 2, Epic: 3, Legendary: 3 };
  return map[diff] || 1;
};