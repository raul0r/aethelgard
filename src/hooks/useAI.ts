import { useStore } from '../store/useStore';

/**
 * 🔮 The Aether Link (AI Hook)
 * Handles communication with LLMs to generate narratives and reviews.
 */

export const useAI = () => {
  const { memory } = useStore();

  // Helper to get the key from localStorage (User sets this in 'Settings')
  const getApiKey = () => localStorage.getItem('AETHELGARD_AI_KEY');
  const getProvider = () => localStorage.getItem('AETHELGARD_AI_PROVIDER') || 'openai';

  const generateNarrative = async (action: string) => {
    const key = getApiKey();
    if (!key) return null; // Fallback to deterministic UI if no key

    const prompt = `
      You are the Digital Dungeon Master of Aethelgard. 
      The player, ${memory.playerName}, just completed: "${action}".
      Context: Class is ${memory.stats.class}, Current Arc is "${memory.narrative.currentArc}".
      Write a 1-sentence immersive RPG chronicle entry in the third person. 
      Keep it atmospheric and brief.
    `;

    // Here you would implement the fetch call to OpenAI/Gemini/Anthropic
    // For now, we return a template of how the call looks:
    console.log("Transmitting to the Aether...", prompt);
    
    // Example: const response = await fetchAI(provider, key, prompt);
    // return response.text;
    return `The Architect etched the runes of ${action} into the eternal ledger.`;
  };

  const generateWeeklyReview = async () => {
    const key = getApiKey();
    if (!key) return "The Council is silent. (Add an API key for AI analysis)";

    const recentHistory = JSON.stringify(memory.activeQuests); // Simplified for example
    
    const prompt = `
      Analyze the following weekly progress for ${memory.playerName}:
      ${recentHistory}
      DM Notes: ${memory.narrative.dmNotes}
      Provide a 'Council of Will' report. 
      1. Identify the 'Dragon' (the task they avoided).
      2. Analyze the Stat Balance.
      3. Give one Stoic piece of advice.
    `;

    // Logic for calling the API would go here
    return "The Council sees your growth in Wisdom, but warns of the weakening Vitality. Seek the path of the mountain (exercise) next moon.";
  };

  return { generateNarrative, generateWeeklyReview, hasKey: !!getApiKey() };
};