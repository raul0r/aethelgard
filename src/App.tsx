import React, { useState, useEffect } from 'react';
import { Grimoire } from './components/layout/Grimoire';
import { QuestCard } from './components/dashboard/QuestCard';
import { StatBars } from './components/character/StatBars';
import { useStore } from './store/useStore';
import { Quest } from './types/memory';
import './assets/textures/grimoire.css';

const App: React.FC = () => {
  const { memory, addQuest } = useStore();
  const [activeTab, setActiveTab] = useState('Quests');

  // 🪄 Initial Seed: Give the player a "First Quest" if none exist
  useEffect(() => {
    if (memory.activeQuests.length === 0) {
      addQuest({
        id: 'q-init-1',
        title: 'Awaken the Architect',
        description: 'Establish your presence in the realm of Aethelgard.',
        category: 'Wisdom',
        difficulty: 'Easy',
        status: 'In-Progress',
        xpReward: 25,
        goldReward: 5,
        isRecurring: false,
        createdAt: new Date().toISOString()
      });
    }
  }, []);

  return (
    <main className="app-canvas">
      <Grimoire activeTab={activeTab} onTabChange={setActiveTab}>
        
        {/* 📜 LEFT PAGE: The Quest Board */}
        <section className="grimoire-page left-page">
          <div className="page-header">
            <h2>Active Quests</h2>
            <p className="page-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
          </div>
          
          <div className="quest-list">
            {memory.activeQuests.map((quest: Quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
            
            {memory.activeQuests.length === 0 && (
              <p className="empty-msg italic">The board is empty. Rest well, or forge a new path.</p>
            )}
          </div>
        </section>

        {/* 📜 RIGHT PAGE: The Character Sheet */}
        <section className="grimoire-page right-page">
          <StatBars />
          
          {/* 🏹 Narrative Snippet (Placeholder for AI Chronicler) */}
          <div className="narrative-box">
            <h4 className="ink-subtitle">The Chronicle</h4>
            <p className="narrative-text">"{memory.narrative.currentArc}"</p>
          </div>
        </section>

      </Grimoire>
    </main>
  );
};

export default App;