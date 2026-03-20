// =============================================
// utils/helpers.js
// Yardımcı fonksiyonlar
// =============================================

// Pokémon id'sine göre resim URL'i döndürür
// Örnek: id=94 → "094.png"
export function getImgUrl(id) {
  const padded = String(id).padStart(3, "0");
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padded}.png`;
}

// Diziyi rastgele karıştırır (Fisher-Yates algoritması)
export function shuffle(arr) {
  const a = [...arr]; // Orijinal diziyi bozmamak için kopya alıyoruz
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Takımın toplam EXP değerini hesaplar
export function calcTotalExp(team) {
  return team.reduce((sum, p) => sum + p.base_experience, 0);
}