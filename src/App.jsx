import { useState, useRef } from "react";

import Header from "./components/Header";
import TeamSection from "./components/TeamSection";
import VsDivider from "./components/VsDivider";
import HistorySidebar from "./components/HistorySidebar";
import StartScreen from "./components/StartScreen";
import ResultModal from "./components/ResultModal";
import { ALL_POKEMON } from "./data/pokemon";
import styles from "./App.module.css";
import { shuffle, calcTotalExp } from "./utils/helpers";

function buildMatch(savedHistory) {
  const shuffled = shuffle(ALL_POKEMON);
  const team1 = shuffled.slice(0, 4);
  const team2 = shuffled.slice(4, 8);
  const exp1 = calcTotalExp(team1);
  const exp2 = calcTotalExp(team2);
  const matchNum = savedHistory.length > 0 ? savedHistory[0].matchNum + 1 : 1;
  return {
    match: { id: Date.now(), matchNum, team1Exp: exp1, team2Exp: exp2, winner: exp1 > exp2 ? 1 : exp2 > exp1 ? 2 : 0 },
    team1,
    team2,
    exp1,
    exp2,
  };
}

function getSavedHistory() {
  try {
    return JSON.parse(localStorage.getItem("pokedexHistoryList")) || [];
  } catch {
    return [];
  }
}

function App() {
  const hasPlayed = useRef(false);
  const [gameState, setGameState] = useState(null); // null = start screen
  const [historyList, setHistoryList] = useState(getSavedHistory);
  const [showResult, setShowResult] = useState(false);

  const handleStart = () => {
    const savedHistory = getSavedHistory();
    const { match, team1, team2, exp1, exp2 } = buildMatch(savedHistory);
    const newHistoryList = [match, ...savedHistory].slice(0, 20);
    localStorage.setItem("pokedexHistoryList", JSON.stringify(newHistoryList));
    setHistoryList(newHistoryList);
    hasPlayed.current = true;
    setGameState({ team1, team2, exp1, exp2 });
  };

  const handleClearHistory = () => {
    localStorage.removeItem("pokedexHistoryList");
    setHistoryList([]);
  };

  const handleEndGame = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    handleClearHistory();
    setGameState(null);
    setShowResult(false);
    hasPlayed.current = false;
  };

  const calculateResults = () => {
    const wins = historyList.filter(m => m.winner === 1).length;
    const losses = historyList.filter(m => m.winner === 2).length;
    const draws = historyList.filter(m => m.winner === 0).length;
    return { wins, losses, draws, total: historyList.length };
  };

  const showingGame = gameState !== null;

  return (
    <div className={styles.pageWrapper}>
      {/* Google Fonts — Inter */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {!showingGame && (
        <StartScreen onStart={handleStart} hasPlayed={hasPlayed.current} />
      )}

      <div className={styles.appContainer}>
        <Header 
          onRestart={showingGame ? handleStart : undefined} 
          onEndGame={showingGame && historyList.length > 0 ? handleEndGame : undefined} 
        />

        {showingGame && (
          <>
            <TeamSection
              team={gameState.team1}
              totalExp={gameState.exp1}
              isWinner={gameState.exp1 > gameState.exp2}
              revealed={true}
            />

            <VsDivider />

            <TeamSection
              team={gameState.team2}
              totalExp={gameState.exp2}
              isWinner={gameState.exp2 > gameState.exp1}
              revealed={true}
            />
          </>
        )}
      </div>

      <div className={styles.sidebarContainer}>
        <HistorySidebar historyList={historyList} onClear={handleClearHistory} />
      </div>

      {showResult && (
        <ResultModal 
          results={calculateResults()} 
          onRestart={handleReset} 
          onClose={() => setShowResult(false)} 
        />
      )}
    </div>
  );
}

export default App;