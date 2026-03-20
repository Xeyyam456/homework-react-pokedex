// =============================================
// data/pokemon.js
// Oyunda kullanılacak tüm Pokémon listesi ve tip renkleri
// =============================================

export const ALL_POKEMON = [
  { id: 4,   name: "Charmander", type: "fire",     base_experience: 62  },
  { id: 7,   name: "Squirtle",   type: "water",    base_experience: 63  },
  { id: 11,  name: "Metapod",    type: "bug",      base_experience: 72  },
  { id: 12,  name: "Butterfree", type: "flying",   base_experience: 178 },
  { id: 25,  name: "Pikachu",    type: "electric", base_experience: 112 },
  { id: 39,  name: "Jigglypuff", type: "normal",   base_experience: 95  },
  { id: 94,  name: "Gengar",     type: "poison",   base_experience: 225 },
  { id: 133, name: "Eevee",      type: "normal",   base_experience: 65  },
];

// Her Pokémon tipine karşılık gelen renk
export const TYPE_COLORS = {
  fire:     "#FF6B35",
  water:    "#4A90D9",
  bug:      "#7CB342",
  flying:   "#81D4FA",
  electric: "#FFD600",
  normal:   "#A8A878",
  poison:   "#A040A0",
  ghost:    "#705898",
};