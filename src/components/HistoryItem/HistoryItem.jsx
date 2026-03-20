import styles from "./HistoryItem.module.css";

function HistoryItem({ match }) {
  return (
    <div className={styles.historyItem}>
      <div className={styles.matchNum}>Match {match.matchNum}</div>
      <div className={styles.historyScores}>
        <div className={`${styles.teamScore} ${match.winner === 1 ? styles.winner : match.winner === 0 ? styles.draw : styles.loser}`}>
          <span className={styles.teamLabel}>T1</span>
          <span className={styles.expVal}>{match.team1Exp}</span>
        </div>
        
        <div className={styles.vsBadge}>VS</div>
        
        <div className={`${styles.teamScore} ${match.winner === 2 ? styles.winner : match.winner === 0 ? styles.draw : styles.loser}`}>
          <span className={styles.teamLabel}>T2</span>
          <span className={styles.expVal}>{match.team2Exp}</span>
        </div>
      </div>
    </div>
  );
}

export default HistoryItem;
