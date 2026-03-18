import { useStore } from '../store/useStore';
import { MemoryFile } from '../types/memory';

/**
 * 💾 The Ledger Vault (Storage Hook)
 * Handles physical JSON imports, exports, and backups.
 */

export const useStorage = () => {
  const { memory, importMemory } = useStore();

  /**
   * 📤 Export: Downloads the current state as a .json file
   */
  const exportMemory = () => {
    const dataStr = JSON.stringify(memory, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `aethelgard_backup_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    linkElement.remove();
  };

  /**
   * 📥 Import: Reads a .json file and updates the store
   */
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = event.target.files?.[0];

    if (!file) return;

    fileReader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData: MemoryFile = JSON.parse(content);

        // Simple validation: Check if it's an Aethelgard file
        if (parsedData.version && parsedData.playerName) {
          importMemory(parsedData);
          alert(`Welcome back, ${parsedData.playerName}. Your journey resumes.`);
        } else {
          throw new Error("Invalid Aethelgard file structure.");
        }
      } catch (err) {
        console.error("Import failed:", err);
        alert("Failed to read the magical scroll. Ensure it is a valid .json file.");
      }
    };

    fileReader.readAsText(file);
  };

  return { exportMemory, handleImport };
};