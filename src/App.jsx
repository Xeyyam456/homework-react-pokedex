import { useState } from "react";

import Header from "./components/Header";
import TeamSection from "./components/TeamSection";
import VsDivider from "./components/VsDivider";
import HistorySidebar from "./components/HistorySidebar";
import { ALL_POKEMON } from "./data/pokemon";
import styles from "./App.module.css";
import { shuffle, calcTotalExp } from "./utils/helpers";

let initialHistorySaved = false;

function App() {
  const [shuffled] = useState(() => shuffle(ALL_POKEMON));
  const team1 = shuffled.slice(0, 4);
  const team2 = shuffled.slice(4, 8);

  const exp1 = calcTotalExp(team1);
  const exp2 = calcTotalExp(team2);

  const team1Winner = exp1 > exp2;
  const team2Winner = exp2 > exp1;

  const [historyList, setHistoryList] = useState(() => {
    let savedHistory = [];
    try {
      savedHistory = JSON.parse(localStorage.getItem("pokedexHistoryList")) || [];
    } catch (e) {
      console.error(e);
    }

    if (!initialHistorySaved) {
      initialHistorySaved = true;
      const newMatch = {
        id: Date.now(),
        matchNum: savedHistory.length > 0 ? savedHistory[0].matchNum + 1 : 1,
        team1Exp: exp1,
        team2Exp: exp2,
        winner: exp1 > exp2 ? 1 : exp2 > exp1 ? 2 : 0
      };

      const newHistoryList = [newMatch, ...savedHistory].slice(0, 20);
      localStorage.setItem("pokedexHistoryList", JSON.stringify(newHistoryList));
      return newHistoryList;
    }
    
    return savedHistory;
  });

  const handleClearHistory = () => {
    localStorage.removeItem("pokedexHistoryList");
    setHistoryList([]);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Google Fonts — Inter */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div className={styles.appContainer}>
        <Header />

        <TeamSection
          team={team1}
          totalExp={exp1}
          isWinner={team1Winner}
          revealed={true}
        />

        <VsDivider />

        <TeamSection
          team={team2}
          totalExp={exp2}
          isWinner={team2Winner}
          revealed={true}
        />
      </div>

      <HistorySidebar historyList={historyList} onClear={handleClearHistory} />

    </div>
  );
}

export default App;