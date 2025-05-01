import { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameTime, setGameTime] = useState(300); // 5 hours in minutes
  const [notebookEntries, setNotebookEntries] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(1);
  const [gameEndStatus, setGameEndStatus] = useState(null);

  useEffect(() => {
    const timer = gameTime > 0 && setInterval(() => {
      setGameTime(prev => prev - 1);
    }, 60000); // Count down every minute
    return () => clearInterval(timer);
  }, [gameTime]);

  const deductTime = (minutes) => {
    setGameTime(prev => Math.max(0, prev - minutes));
  };

  const addNotebookEntry = (entry) => {
    setNotebookEntries(prev => [...prev, entry]);
  };

  const updatePuzzle = (puzzleId) => {
    setCurrentPuzzle(puzzleId);
  };

  const resetGame = () => {
    setGameTime(300);
    setNotebookEntries([]);
    setCurrentPuzzle(1);
    setGameEndStatus(null);
  };

  return (
    <GameContext.Provider value={{
      gameTime,
      deductTime,
      addNotebookEntry,
      notebookEntries,
      currentPuzzle,
      updatePuzzle,
      gameEndStatus,
      setGameEndStatus,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};