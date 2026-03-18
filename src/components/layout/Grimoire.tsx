import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../assets/textures/grimoire.css'; // We will create this next

interface GrimoireProps {
  children: React.ReactNode; // This will be the Left and Right pages
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Grimoire: React.FC<GrimoireProps> = ({ children, activeTab, onTabChange }) => {
  const tabs = ['Quests', 'Character', 'Talents', 'Mirror', 'Settings'];

  return (
    <div className="grimoire-container">
      {/* 1. The Leather Cover Wrapper */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grimoire-book"
      >
        {/* 2. The Navigation Tabs (Ribbons on the side) */}
        <div className="grimoire-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-ribbon ${activeTab === tab ? 'active' : ''}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 3. The Two-Page Spread */}
        <div className="pages-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ rotateY: -20, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="parchment-spread"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 4. Decorative Elements (The Bookmark) */}
        <div className="grimoire-bookmark" />
      </motion.div>

      {/* Background Ambience (Subtle Dust Particles) */}
      <div className="ambient-overlay" />
    </div>
  );
};