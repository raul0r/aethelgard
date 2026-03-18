import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

export const StatBars: React.FC = () => {
  const { memory } = useStore();
  const { stats } = memory;

  // Calculate percentage of XP toward next level
  const xpPercentage = (stats.xp / stats.nextLevelXp) * 100;

  return (
    <div className="character-sheet">
      <div className="character-header">
        <h2 className="character-name">{memory.playerName}</h2>
        <p className="character-title">{stats.title} • Lvl {stats.level}</p>
      </div>

      {/* 🔮 The XP Bar (The Path to Ascension) */}
      <div className="stat-group">
        <label>Experience (XP)</label>
        <div className="progress-bar-container xp">
          <motion.div 
            className="progress-bar-fill xp-fill"
            initial={{ width: 0 }}
            animate={{ width: `${xpPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <span className="progress-text">{stats.xp} / {stats.nextLevelXp}</span>
        </div>
      </div>

      <div className="attributes-grid">
        {Object.entries(stats.attributes).map(([attr, value]) => (
          <div key={attr} className="attribute-item">
            <div className={`attr-icon ${attr}`} />
            <div className="attr-info">
              <span className="attr-label">{attr.toUpperCase()}</span>
              <span className="attr-value">{value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="wealth-display">
        <span className="gold-icon">🪙</span>
        <span className="gold-amount">{stats.gold} Gold</span>
      </div>
    </div>
  );
};