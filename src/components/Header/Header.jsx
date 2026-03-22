import Button from "../Button";
import styles from "./Header.module.css";

function Header({ onRestart, onEndGame }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokedex</h1>
      <div className={styles.buttonsContainer}>
        {onRestart && (
          <Button variant="restart" onClick={onRestart}>
            🔄 Restart
          </Button>
        )}
        {onEndGame && (
          <Button variant="endGame" onClick={onEndGame}>
            🏁 End Game
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;