import Button from "../Button";
import styles from "./ResultModal.module.css";

function ResultModal({ results, onRestart, onClose }) {
  const { wins, losses, draws, total } = results;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Game Summary</h2>
        
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Total Matches</span>
            <span className={styles.statValue}>{total}</span>
          </div>
          
          <div className={styles.scoreRow}>
            <div className={`${styles.scoreBox} ${styles.winBox}`}>
              <span className={styles.scoreValue}>{wins}</span>
              <span className={styles.scoreLabel}>Wins</span>
            </div>
            
            <div className={styles.vsText}>-</div>
            
            <div className={`${styles.scoreBox} ${styles.lossBox}`}>
              <span className={styles.scoreValue}>{losses}</span>
              <span className={styles.scoreLabel}>Losses</span>
            </div>
          </div>

          {draws > 0 && (
            <div className={styles.drawText}>
              Draws: {draws}
            </div>
          )}
        </div>

        <p className={styles.message}>
          {wins > losses ? "Congratulations! Great performance!" : 
           wins < losses ? "You can do better! Good luck next time!" : 
           "A close match!"}
        </p>

        <div className={styles.actions}>
          <Button variant="restart" onClick={onRestart}>
            🔄 Start New Game
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultModal;
