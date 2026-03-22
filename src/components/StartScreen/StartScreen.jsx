import Button from "../Button";
import styles from "./StartScreen.module.css";

function StartScreen({ onStart, hasPlayed }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="Pokémon"
          className={styles.logo}
        />
        <h1 className={styles.title}>Pokémon Battle</h1>
        <p className={styles.subtitle}>
          team 1 and team 2 are randomly selected and the winner is determined by the total EXP points!
        </p>
        <Button variant="restart" onClick={onStart}>
          {hasPlayed ? "🔄 Restart" : "⚔️ Start"}
        </Button>
      </div>
    </div>
  );
}

export default StartScreen;
