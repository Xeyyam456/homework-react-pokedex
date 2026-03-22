

import { getImgUrl } from "../../utils/helpers";
import Button from "../Button";
import styles from "./PokemonCard.module.css";

function PokemonCard({ pokemon, revealed }) {
  const stateClass = revealed ? styles.cardRevealed : styles.cardHidden;

  return (
    <div
      className={`${styles.card} ${stateClass}`}
      data-type={pokemon.type}
    >
      {revealed ? (
        <>
          <div className={styles.title}>{pokemon.name}</div>
          <img src={getImgUrl(pokemon.id)} alt={pokemon.name} className={styles.image} />
          
          <div className={styles.typeText}>Type: {pokemon.type}</div>
          <div className={styles.expText}>EXP {pokemon.base_experience}</div>

          <Button
            href={`https://www.pokemon.com/us/pokedex/${pokemon.name.toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
          >
            Read more
          </Button>
        </>
      ) : (
        <>
          <div className={styles.placeholder} />
          <div className={styles.hiddenExpText}>EXP {pokemon.base_experience}</div>
          <Button>Read more</Button>
        </>
      )}
    </div>
  );
}

export default PokemonCard;