// =============================================
// components/PokemonCard.jsx
// Tek bir Pokémon'u gösteren kart komponenti
// Props:
//   pokemon  – Pokémon objesi { id, name, type, base_experience }
//   revealed – true ise kart açık, false ise gizli (oyun başlamadan önce)
// =============================================

import { TYPE_COLORS } from "../../data/pokemon";
import { getImgUrl } from "../../utils/helpers";
import styles from "./PokemonCard.module.css";

function PokemonCard({ pokemon, revealed }) {
  const color = TYPE_COLORS[pokemon.type] || "#999";
  const stateClass = revealed ? styles.cardRevealed : styles.cardHidden;

  return (
    <div
      className={`${styles.card} ${stateClass}`}
      style={{ '--poke-color': color, '--poke-shadow': `${color}44` }}
    >
      {revealed ? (
        <>
          <div className={styles.title}>{pokemon.name}</div>
          <img src={getImgUrl(pokemon.id)} alt={pokemon.name} className={styles.image} />
          
          <div className={styles.typeText}>Type: {pokemon.type}</div>
          <div className={styles.expText}>EXP {pokemon.base_experience}</div>

          <a
            href={`https://www.pokemon.com/us/pokedex/${pokemon.name.toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
            className={styles.linkButton}
          >
            Read more
          </a>
        </>
      ) : (
        <>
          <div className={styles.placeholder} />
          <div className={styles.hiddenExpText}>EXP {pokemon.base_experience}</div>
          <button className={styles.hiddenButton}>Read more</button>
        </>
      )}
    </div>
  );
}

export default PokemonCard;