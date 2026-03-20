import HistoryItem from "../HistoryItem";
import ClearButton from "../ClearButton";
import styles from "./HistorySidebar.module.css";

function HistorySidebar({ historyList, onClear }) {
  return (
    <div className={styles.historySidebar}>
      <div className={styles.headerRow}>
        <h2 className={styles.historyTitle}>Match History</h2>
        <ClearButton onClick={onClear} />
      </div>

      <div className={styles.listWrapper}>
        {historyList.length === 0 ? (
          <div className={styles.emptyText}>No history yet.</div>
        ) : (
          <div className={styles.historyList}>
            {historyList.map((match) => (
              <HistoryItem key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorySidebar;
