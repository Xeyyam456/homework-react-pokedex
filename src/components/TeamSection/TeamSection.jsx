

import PokemonCard from "../PokemonCard";
import styles from "./TeamSection.module.css";

function TeamSection({ team, totalExp, isWinner, revealed }) {
  // Kazanma durumuna göre etiket metni ve rengi belirleniyor
  const labelText  = isWinner === null ? "" : isWinner ? "Winner" : "Lose";
  const labelClass = isWinner ? styles.winner : styles.loser;

  return (
    <div className={styles.container}>

      {/* Kazanan / Kaybeden etiketi — sadece oyun bittiyse göster */}
      {revealed && labelText && (
        <div className={styles.labelContainer}>
          <span className={`${styles.label} ${labelClass}`}>
            {labelText}
          </span>
        </div>
      )}

      {/* Toplam EXP skoru — sadece oyun bittiyse göster */}
      {revealed && (
        <div className={styles.expScore}>
          {totalExp}
        </div>
      )}

      {/* Takımdaki 4 Pokémon kartı */}
      <div className={styles.cardGrid}>
        {team.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            revealed={revealed}
          />
        ))}
      </div>

    </div>
  );
}

export default TeamSection;