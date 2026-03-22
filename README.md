# 🎮 React Pokédex — Sətir-Sətir Dokumentasiya

> **Texnologiyalar:** React 18 · Vite · CSS Modules · LocalStorage  
> **Dil:** JavaScript (JSX)

---

## 📌 Layihə Haqqında

Bu layihə **React + Vite** ilə hazırlanmış bir **Pokémon mübarizəsi** veb tətbiqidir.  
8 Pokémon hər dəfə **təsadüfi** qarışdırılır, 4-4 komandaya bölünür, hər komanddakı EXP balları toplanır, cəm yüksək olan komanda **qalibdir**. Hər oyun **LocalStorage**-a avtomatik qeyd olunur.

---

## 🗂️ Fayl Strukturu

```
src/
├── main.jsx           → Tətbiqin React-i HTML-ə bağladığı giriş nöqtəsi
├── App.jsx            → Kök komponent, bütün məntiq burada
├── App.module.css     → App komponentinə aid CSS stilləri
├── index.css          → Global sıfırlama stilləri (margin, padding, box-sizing)
├── data/
│   └── pokemon.js     → Oyunda işlənən 8 Pokémon + tip rəngləri
├── utils/
│   └── helpers.js     → Saf (pure) köməkçi funksiyalar
└── components/
    ├── Header/        → Səhifənin başlığı ("Pokédex") + "Restart" və "End Game" düymələri
    ├── TeamSection/   → Bir komanddakı 4 kart + EXP + qalib etiketi
    ├── PokemonCard/   → Tək Pokémon kartı (yeni Button komponenti ilə)
    ├── VsDivider/     → İki komanda arasındakı "VS" görsəli
    ├── HistorySidebar/→ Sağ tərəfdəki oyun tarixçəsi paneli
    ├── StartScreen/   → Oyunun ilk açılış ekranı (Overlay)
    ├── ResultModal/   → Oyun sonu ümumi nəticələr (Wins/Losses)
    └── Button/        → Təkrar istifadə oluna bilən universal düymə komponenti
```

> **Niyə hər komponent qovluğunda `index.jsx` var?**  
> `index.jsx` yalnız bir sətirdən ibarətdir: `export { default } from "./ComponentName"`.  
> Bu sayədə digər fayllardan import yazarkən `../Header/Header` yerinə sadəcə `../Header` yazmaq kifayətdir.

---

## 🔧 Sətir-Sətir İzah

### `main.jsx` — Tətbiqin Giriş Nöqtəsi

```jsx
import { StrictMode } from 'react'
```
> React kitabxanasından `StrictMode` komponentini import edir.  
> `StrictMode` inkişaf rejimində kodunuzdakı potensial problemləri aşkar etmək üçün bəzi komponentləri iki dəfə render edir. Bu **yalnız inkişaf rejimindədir**, istehsal build-inda heç bir fərqi yoxdur.

```jsx
import { createRoot } from 'react-dom/client'
```
> React 18-in yeni API-sindən `createRoot` funksiyasını import edir.  
> Bu funksiya React-ə "bu HTML elementinin içini sən idarə et" deyir. React 17-dəki `ReactDOM.render()` metodunun yerinə keçib.

```jsx
import './index.css'
```
> Qlobal CSS faylını import edir. Bu fayl bütün elementlər üçün `margin: 0`, `padding: 0`, `box-sizing: border-box` kimi sıfırlama stillərini tətbiq edir ki, fərqli brauzerlər arasında dizayn uyğunluğu olsun.

```jsx
import App from './App'
```
> Kök komponenti — `App`-i — import edir. Bütün digər komponentlər `App`-in içindən çağrılır.

```jsx
createRoot(document.getElementById('root')).render(
```
> `document.getElementById('root')` — HTML faylındakı `<div id="root"></div>` elementini tapır.  
> `.render(...)` — həmin div-in içinə React ağacını yazır. Veb saytdakı hər şey bu bir div-dən başlayır.

```jsx
  <StrictMode>
    <App />
  </StrictMode>,
```
> `App` komponentini `StrictMode` içinə sarır. Yuxarıda izah etdiyimiz kimi, bu inkişaf zamanı potensial problemləri müəyyən etməyə kömək edir. Məsələn, əgər `useEffect` içində lazımsız işlər varsa, `StrictMode` bunu iki dəfə çalışdıraraq göstərir.

---

### `data/pokemon.js` — Məlumat Faylı

```js
export const ALL_POKEMON = [
```
> `export` — bu dəyişkəni başqa fayllar import edə bilər.  
> `const` — bu massiv heç vaxt yenidən təyin edilməyəcək (dəyişdirilməz referans).  
> `ALL_POKEMON` — böyük hərflər adın "sabit" (constant) olduğunu göstərən konvensiyadır.

```js
  { id: 4, name: "Charmander", type: "fire", base_experience: 62 },
```
> Hər Pokémon bir JavaScript obyektidir `{}`.  
> - `id: 4` → Ulusal Pokédex nömrəsi. Şəkil URL-i bu nömrədən yaradılır (bax: `getImgUrl`)  
> - `name: "Charmander"` → Pokémon-un adı. `PokemonCard`-da göstərilir, həmçinin "Read more" linkini yaratmaq üçün istifadə olunur  
> - `type: "fire"` → Tipi. `TYPE_COLORS`-dan uyğun rəng seçmək üçün açar kimi işlənir  
> - `base_experience: 62` → Oyunda istifadə olunan EXP balı. Komanddakı 4 Pokémon-un bu dəyərləri toplanır, yüksək olan komanda qalibdir

```js
export const TYPE_COLORS = {
  fire: "#FF6B35",
  ...
};
```
> Hər tip adı (`"fire"`, `"water"` ...) bir HEX rəng koduna uyğun gəlir.  
> `PokemonCard` içində `TYPE_COLORS[pokemon.type]` yazılır — bu, Pokémon-un tipini açar kimi istifadə edərək uyğun rəngi tapır.  
> Məsələn: `TYPE_COLORS["fire"]` → `"#FF6B35"` (narıncı)

---

### `utils/helpers.js` — Köməkçi Funksiyalar

#### `getImgUrl(id)`

```js
export function getImgUrl(id) {
```
> `export` — bu funksiya başqa fayllardan import edilə bilər.  
> `id` — Pokémon-un Pokédex nömrəsi (məsələn: `4`, `94`, `133`).

```js
  const padded = String(id).padStart(3, "0");
```
> `String(id)` — `id` rəqəmini mətn (string) tipinə çevirir. Məsələn: `4` → `"4"`.  
> `.padStart(3, "0")` — sətrin uzunluğu 3-dən az olarsa soldan `"0"` əlavə edir.  
> Niyə? Pokemon şəkil URL-lərinin fayl adları 3 rəqəmlidir: `004.png`, `025.png`, `133.png`.  
> Əgər bu dönüşüm olmasa, `4.png` URL-i yarıq olardı.

```js
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padded}.png`;
```
> Template literal (şablon sətri) ilə URL yaradır. `${padded}` yerinə 3 rəqəmli ID qoyulur.  
> Nəticə: `"https://assets.pokemon.com/.../004.png"` — rəsmi pokemon.com-ун şəkil CDN-i.

---

#### `shuffle(arr)` — Fisher-Yates Alqoritmi

```js
export function shuffle(arr) {
```
> `arr` — qarışdırılacaq massiv (bu layihədə `ALL_POKEMON`).

```js
  const a = [...arr];
```
> `[...arr]` — **spread operatoru** ilə massivin tam kopyasını yaradır.  
> Niyə? `arr`-ı birbaşa dəyişdirsək, orijinal `ALL_POKEMON` sabitini də pozmış olarıq.  
> Kopya üzərində işlədiyimiz üçün orijinal massiv heç vaxt dəyişmir.

```js
  for (let i = a.length - 1; i > 0; i--) {
```
> Döngü massivin **sonuncu elementindən** (`a.length - 1`) başlayır və **ikinci elementə** (`i > 0`) qədər geri gedir.  
> Niyə sondan başlayır? Fisher-Yates alqoritmi belə işləyir: hər addımda "hələ qarışdırılmamış" hissədən təsadüfi bir element seçirik.

```js
    const j = Math.floor(Math.random() * (i + 1));
```
> `Math.random()` — 0 (daxil) ilə 1 (xaric) arasında onluq ədəd qaytarır. Məsələn: `0.7431...`  
> `* (i + 1)` — bu ədədi `0` ilə `i` arasında bir aralığa gətirir. Məsələn `i=6` üçün: `0` ilə `6.999...` arası.  
> `Math.floor(...)` — onluq hissəni kəsib tam ədəd verir: `0`, `1`, `2`, `3`, `4`, `5`, ya da `6`.  
> Beləliklə `j` — `0`-dan `i`-yə qədər (daxil olmaqla) təsadüfi bir indeksdir.

```js
    [a[i], a[j]] = [a[j], a[i]];
```
> JavaScript-in **destructuring assignment** sintaksisi ilə iki elementin yerini dəyişdirir.  
> Köhnə üsul 3 sətir tələb edirdi (müvəqqəti dəyişən vasitəsilə):
> ```js
> let temp = a[i];
> a[i] = a[j];
> a[j] = temp;
> ```
> Bu yeni sintaksis həmin 3 sətri **bir sətirə** sıxır.

```js
  return a;
```
> Qarışdırılmış yeni massivi qaytarır. Orijinal `arr` dəyişməyib.

---

#### `calcTotalExp(team)`

```js
export function calcTotalExp(team) {
```
> `team` — 4 Pokémon-dan ibarət massiv.

```js
  return team.reduce((sum, p) => sum + p.base_experience, 0);
```
> `Array.reduce()` massivi tək bir dəyərə **yığır** (azaldır).  
> - İlk arqument `(sum, p) => sum + p.base_experience` — hər addımda icra olunan funksiya:  
>   - `sum` → indiyə qədər toplanmış cəm  
>   - `p` → cari Pokémon obyekti  
>   - `sum + p.base_experience` → cəmə bu Pokémon-un EXP-sini əlavə edir  
> - İkinci arqument `0` → cəmin başlanğıc dəyəri (sıfırdan başla)  
>
> **İcra nümunəsi** (team1 = [Gengar(225), Pikachu(112), Squirtle(63), Charmander(62)]):
> ```
> Addım 1: sum=0   + 225 = 225
> Addım 2: sum=225 + 112 = 337
> Addım 3: sum=337 + 63  = 400
> Addım 4: sum=400 + 62  = 462  ← nəticə
> ```

---

### `App.jsx` — Kök Komponent

```jsx
import { useState } from "react";
```
> React-dən yalnız `useState` hook-unu import edir. `useEffect` yoxdur — bu layihədə lazım deyil.

```jsx
import Header from "./components/Header";
import TeamSection from "./components/TeamSection";
import VsDivider from "./components/VsDivider";
import HistorySidebar from "./components/HistorySidebar";
```
> Uşaq komponentlər import edilir. Hər qovluqda `index.jsx` olduğu üçün tam fayl adı yazmaq lazım deyil.

```jsx
import { ALL_POKEMON } from "./data/pokemon";
```
> Adlı (named) export-u məşxərəli mötərizə ilə import edir. `ALL_POKEMON` məlumat qatından gəlir.

```jsx
import { shuffle, calcTotalExp } from "./utils/helpers";
```
> İki köməkçi funksiyani import edir.

```jsx
let initialHistorySaved = false;
```
> Komponent **xaricində**, modul səviyyəsində bir bayrak dəyişkəni.  
> **Niyə komponent xaricindədir?**  
> Komponent içindəki dəyişkənlər hər render-da sıfırlanır. Modul səviyyəsindəki dəyişkən isə fayl ömrü boyunca bir dəfə yaradılır.  
> **Niyə lazımdır?**  
> React 18 `StrictMode` inkişaf rejimində hər komponenti iki dəfə mount edir. Bu bayrak olmadan eyni oyun LocalStorage-a iki dəfə yazılardı.

```jsx
function App() {
```
> `App` adlı React funksional komponenti.

```jsx
  const [shuffled] = useState(() => shuffle(ALL_POKEMON));
```
> `useState(...)` — React state yaradır.  
> `() => shuffle(ALL_POKEMON)` — **lazy initializer** (tənbəl başlatıcı). `useState`-ə funksiya ötürüldükdə, React həmin funksiyani yalnız **birinci render-da** çağırır. Sonrakı render-larda nəticəni yadda saxlayır.  
> `shuffle(ALL_POKEMON)` — bütün 8 Pokémon-u Fisher-Yates alqoritmi ilə qarışdırır.  
> `const [shuffled]` — massivin [dəyər, setter] cütlüyündən yalnız dəyəri götürür. Setter lazım deyil, çünki komanda oyun boyu dəyişmir.

```jsx
  const team1 = shuffled.slice(0, 4);
```
> `slice(0, 4)` — indeks `0`, `1`, `2`, `3`-ü (4 element) yeni massivə kopyalayır.  
> `4`-ü **daxil etmir** (son indeks xaric qalır).  
> `team1` — birinci komanddakı 4 Pokémon.

```jsx
  const team2 = shuffled.slice(4, 8);
```
> `slice(4, 8)` — indeks `4`, `5`, `6`, `7`-ni (4 element) götürür.  
> `team2` — ikinci komanddakı 4 Pokémon.

```jsx
  const exp1 = calcTotalExp(team1);
  const exp2 = calcTotalExp(team2);
```
> `calcTotalExp` funksiyasına hər bir komandanı ötürür.  
> Nəticə — hər komanddakı `base_experience` dəyərlərinin cəmi.

```jsx
  const team1Winner = exp1 > exp2;
  const team2Winner = exp2 > exp1;
```
> Sadə müqayisə. Hər biri `true` ya da `false` qaytarır.  
> Əgər hər ikisi `false`-dırsa (yəni `exp1 === exp2`) — **bərabərə**.  
> Bu dəyərlər `TeamSection`-a prop kimi ötürülür, "Winner" / "Lose" etiketlərini göstərmək üçün işlənir.

```jsx
  const [historyList, setHistoryList] = useState(() => {
```
> `historyList` — oyun tarixçəsi (göstəriləcək massiv).  
> `setHistoryList` — bu state-i yeniləmək üçün funksiya.  
> Yenə lazy initializer istifadə olunur — içindəki funksiya yalnız bir dəfə işləyir.

```jsx
    let savedHistory = [];
    try {
      savedHistory = JSON.parse(localStorage.getItem("pokedexHistoryList")) || [];
    } catch (e) {
      console.error(e);
    }
```
> `localStorage.getItem("pokedexHistoryList")` — brauzerin LocalStorage-ından "pokedexHistoryList" açarına uyğun dəyəri oxuyur. Əgər heç nə yoxdursa `null` qaytarır.  
> `JSON.parse(...)` — LocalStorage-da məlumatlar **string** kimi saxlanılır. `parse` onu JavaScript massivə çevirir.  
> `|| []` — əgər `null` və ya undefined gəlirsə, boş massiv istifadə et.  
> `try...catch` — `JSON.parse` xəta verərsə (məsələn, localStorage-da korlanmış məlumat varsa) tətbiq çökməsin deyə xətanı ötər.

```jsx
    if (!initialHistorySaved) {
      initialHistorySaved = true;
```
> `!initialHistorySaved` — bayrak hələ `false`-dırsa bu bloku icra et.  
> `initialHistorySaved = true` — bayrağı dərhal `true`-ya çevir ki, bu blok ikinci dəfə işləməsin.

```jsx
      const newMatch = {
        id: Date.now(),
```
> `Date.now()` — Unix vaxtı millisaniyə ilə qaytarır (məsələn: `1711234567890`).  
> Bu dəyər unikallığı təmin edir, həmçinin `key={match.id}` kimi React siyahılarında istifadə olunur.

```jsx
        matchNum: savedHistory.length > 0 ? savedHistory[0].matchNum + 1 : 1,
```
> Şərti ifadə (ternary operator):  
> - Əgər tarixçədə oyun varsa (`length > 0`): birinci (ən yeni) oyunun `matchNum`-undan **+1** al  
> - Əgər tarixçə boşdursa: `1`-dən başla  
> Niyə `savedHistory[0].matchNum + 1`? Çünki yeni oyunlar siyahının **başına** əlavə olunur, ona görə `[0]` həmişə ən son oyundur.

```jsx
        team1Exp: exp1,
        team2Exp: exp2,
```
> Yuxarıda hesablanmış EXP dəyərlərini oyun qeydinə əlavə edir.

```jsx
        winner: exp1 > exp2 ? 1 : exp2 > exp1 ? 2 : 0
```
> İç-içə ternary:  
> - `exp1 > exp2` → `1` (birinci komanda qazandı)  
> - `exp2 > exp1` → `2` (ikinci komanda qazandı)  
> - Başqa hal (bərabər) → `0`  
> Bu rəqəm `HistoryItem`-da rəng seçimi üçün istifadə olunur.

```jsx
      const newHistoryList = [newMatch, ...savedHistory].slice(0, 20);
```
> `[newMatch, ...savedHistory]` — yeni oyunu **başa** qoyub, köhnə tarixçəni arxaya əlavə edir.  
> `.slice(0, 20)` — siyahını maksimum 20 oyunla məhdudlaşdırır ki, LocalStorage dolmasın.

```jsx
      localStorage.setItem("pokedexHistoryList", JSON.stringify(newHistoryList));
      return newHistoryList;
```
> `JSON.stringify(...)` — JavaScript massivini JSON string-ə çevirir (LocalStorage yalnız string saxlayır).  
> `setItem(açar, dəyər)` — brauzerə yazır.  
> `return newHistoryList` — yeni tarixçəni `historyList` state-inin ilkin dəyəri kimi qaytar.

```jsx
    }
    return savedHistory;
```
> Əgər `initialHistorySaved` artıq `true`-dursa (ikinci render) — yalnız köhnə tarixçəni qaytar, yenidən yazma.

```jsx
  const handleClearHistory = () => {
    localStorage.removeItem("pokedexHistoryList");
    setHistoryList([]);
  };
```
> `removeItem(açar)` — LocalStorage-dan həmin açarı tamamilə silir.  
> `setHistoryList([])` — React state-ini boş massivə yeniləyir ki, UI dərhal güncəllənsin (boş siyahı göstərilsin).

---

### `App.jsx` — JSX Hissəsi

```jsx
  return (
    <div className={styles.pageWrapper}>
```
> Bütün səhifəni saran ən xarici `div`. CSS Modules-dən `pageWrapper` sinifini tətbiq edir.  
> Bu div həm əsas məzmunu, həm də sağdakı `HistorySidebar`-ı yan-yana düzmək üçün `flex` layoutunun konteyneridir.

```jsx
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
```
> Google Fonts-dan **Inter** şriftini yükləyir. JSX-də HTML `<link>` teqini istifadə etmək mümkündür.  
> `wght@400;500;600;700;800;900` — müxtəlif qalınlıqlarda (normal, medium, semibold, bold, extrabold, black) şrift yükləyir.  
> `display=swap` — şrift yüklənənə qədər sistemin standart şrifti göstərir, şrift gəldikdə dəyişdirir.

```jsx
      <div className={styles.appContainer}>
        <Header />
```
> Əsas məzmun bloku. `Header` komponenti burada render olunur.

```jsx
        <TeamSection
          team={team1}
          totalExp={exp1}
          isWinner={team1Winner}
          revealed={true}
        />
```
> Birinci komanddakı məlumatları `TeamSection`-a prop kimi ötürür.  
> `revealed={true}` — istifadəçi karta klikləmədən kartlar açıq göstərilir (köhnə versiyada "Start Game" düyməsi vardı).

```jsx
        <VsDivider />
```
> İki komanda arasında "VS" mətnini göstərən bölücü.

```jsx
        <TeamSection
          team={team2}
          totalExp={exp2}
          isWinner={team2Winner}
          revealed={true}
        />
      </div>
```
> İkinci komanda üçün eyni `TeamSection` komponenti, fərqli props ilə.

```jsx
      <HistorySidebar historyList={historyList} onClear={handleClearHistory} />
```
> Sağdakı kenar panelinə `historyList` (göstəriləcək massiv) və `onClear` (silmə funksiyası) ötürülür.

---

### `components/TeamSection/TeamSection.jsx`

```jsx
function TeamSection({ team, totalExp, isWinner, revealed }) {
```
> Funksiya parametrindəki `{ ... }` — **destructuring**. Props obyektindən birbaşa dəyərləri çıxarır.

```jsx
  const labelText = isWinner === null ? "" : isWinner ? "Winner" : "Lose";
```
> İç-içə ternary:  
> - `isWinner === null` → heç bir etiket göstərmə (oyun başlamayıb)
> - `isWinner === true` → "Winner"  
> - `isWinner === false` → "Lose"

```jsx
  const labelClass = isWinner ? styles.winner : styles.loser;
```
> `isWinner`-ə görə CSS sinifini seçir. `winner` yaşıl, `loser` qırmızı göstərir.

```jsx
  {revealed && labelText && (
    <div className={styles.labelContainer}>
```
> `&&` — **short-circuit evaluation** (qısa qapanma).  
> - `revealed` `false`-dırsa sağdakı JSX heç render olmur.  
> - `labelText` boş string (`""`) isə yenə render olmur.  
> İkisi də `true` olarsa etiket göstərilir.

```jsx
  {team.map((pokemon) => (
    <PokemonCard
      key={pokemon.id}
      pokemon={pokemon}
      revealed={revealed}
    />
  ))}
```
> `team` massivinin hər elementini (`pokemon`) `PokemonCard` komponentinə çevirir.  
> `key={pokemon.id}` — React-ə siyahı elementlərini **fərqləndirmək** üçün unikal açar lazımdır. Bu olmadan React elementləri düzgün izləyə bilməz.

---

### `components/PokemonCard/PokemonCard.jsx`

```jsx
  const color = TYPE_COLORS[pokemon.type] || "#999";
```
> `TYPE_COLORS` obyektindən Pokémon-un tipinə uyğun rəng kodu alır.  
> `|| "#999"` — əgər tip tapılmazsa (məsələn, gələcəkdə yeni bir tip əlavə olunsa) boz rəng istifadə et.

```jsx
  const stateClass = revealed ? styles.cardRevealed : styles.cardHidden;
```
> `revealed`-ə görə ya açıq, ya da gizli kart CSS sinifi seçilir.

```jsx
    <div
      className={`${styles.card} ${stateClass}`}
      style={{ '--poke-color': color, '--poke-shadow': `${color}44` }}
    >
```
> `className` — birden çox CSS sinifini boşluqla birləşdirir.  
> `style={{ '--poke-color': color }}` — **CSS custom property** (dəyişkən) birbaşa elementin inline style-ına yazılır.  
> CSS-də `var(--poke-color)` istifadə olunduğu hər yerdə bu rəng tətbiq olunur — kart çərçivəsi, kölgə, hover effektləri.  
> `${color}44` — HEX rənginin sonuna `44` əlavə etmək **alpha şəffaflığı** verir (0-255 arası, `44` hex ≈ 27% opacity).

```jsx
      {revealed ? (
        <>
          <div className={styles.title}>{pokemon.name}</div>
          <img src={getImgUrl(pokemon.id)} alt={pokemon.name} className={styles.image} />
```
> `<>...</>` — **React Fragment**. Bir neçə elementi əlavı div olmadan sarmaq üçün.  
> `getImgUrl(pokemon.id)` — Pokémon ID-sindən rəsmi şəkil URL-i yaradır.  
> `alt={pokemon.name}` — şəkil yüklənmədikdə göstərilən alternativ mətn (həmçinin əlçatanlıq üçün vacibdir).

```jsx
          <a
            href={`https://www.pokemon.com/us/pokedex/${pokemon.name.toLowerCase()}`}
            target="_blank"
            rel="noreferrer"
          >
```
> `pokemon.name.toLowerCase()` — adı kiçik hərflərə çevirir (URL-lər kiçik hərflə yazılır): `"Charmander"` → `"charmander"`.  
> `target="_blank"` — linki **yeni tabda** açır.  
> `rel="noreferrer"` — yeni açılan səhifəyə brauzer tarixi haqqında məlumat ötürmür. `_blank` ilə birlikdə **təhlükəsizlik** üçün vacibdir.

---

### `components/HistoryItem/HistoryItem.jsx`

```jsx
<div className={`${styles.teamScore} ${match.winner === 1 ? styles.winner : match.winner === 0 ? styles.draw : styles.loser}`}>
```
> İç-içə ternary ilə üç müxtəlif sinif seçilir:  
> - `match.winner === 1` → T1 qazanıb → `styles.winner` (yaşıl)  
> - `match.winner === 0` → bərabərə → `styles.draw` (sarı)  
> - Başqa hal (yəni `winner === 2`) → T1 uduzub → `styles.loser` (qırmızı)

---

### `components/ClearButton/ClearButton.jsx`

```jsx
function ClearButton({ onClick, text = "Clear History" }) {
```
> `text = "Clear History"` — **default parametr dəyəri**. Əgər bu komponent çağrılarkən `text` prop-u ötürülmürsə, avtomatik olaraq `"Clear History"` istifadə olunur.  
> Bu, komponenti gələcəkdə digər yerlərdə fərqli mətnlə yenidən istifadə etməyə imkan verir.

---

## 💾 LocalStorage Məlumat Axını

```
Sayfa açılır
    │
    ▼
localStorage.getItem("pokedexHistoryList")
    │
    ├─ Məlumat var  → JSON.parse() → JavaScript massivə çevir
    └─ Məlumat yox → boş massiv []
    │
    ▼
Yeni oyun obyekti yarat { id, matchNum, team1Exp, team2Exp, winner }
    │
    ▼
[newMatch, ...savedHistory].slice(0, 20)
→ Yeni oyunu başa əlavə et, max 20 saxla
    │
    ▼
JSON.stringify() → localStorage.setItem()
→ Massiyi string-ə çevir və saxla
    │
    ▼
setHistoryList(newHistoryList) → UI güncəllənir
```


---

## 🚀 Yeni Özelliklər (V2) — Sətir-Sətir İzah

Bu versiyada oyuna **Start Screen**, **End Game** modalı və **Reusable Button** sistemi əlavə edilib.

### `StartScreen.jsx` — Giriş Overlay-i

```jsx
function StartScreen({ onStart, hasPlayed }) {
```
> - `onStart` → Düyməyə klikləyəndə oyunu başladan funksiya (`App.jsx`-dən gəlir).
> - `hasPlayed` → Oyunun ən azı bir dəfə oynanılıb-oynanılmadığını yoxlayır (düymə mətnini dəyişmək üçün).

```jsx
<Button variant="restart" onClick={onStart}>
  {hasPlayed ? "🔄 Restart" : "⚔️ Start"}
</Button>
```
> - Əgər oyunçu ilk dəfə daxil olubsa `"Start"`, artıq bir dəfə oynayıbsa `"Restart"` mətni göstərilir.
> - `variant="restart"` → Universal `Button` komponentinin sarı/qızılı stil variantından istifadə edir.

---

### `App.jsx` — Yeni State Məntiqi

```jsx
const [gameState, setGameState] = useState(null);
```
> - `gameState` → Tətbiqin "rejimi"ni idarə edir.
> - `null` olduqda → Biz hələ `StartScreen`-dəyik.
> - Obyekt olduqda (`{ team1, team2, ... }`) → Oyun ekranındayıq.

```jsx
const handleStart = () => {
    const { match, team1, team2, exp1, exp2 } = buildMatch(savedHistory);
    setGameState({ team1, team2, exp1, exp2 });
};
```
> - Bu funksiya hər klik zamanı yeni Pokémon komandaları yaradır və `gameState`-i doldurur.
> - `setGameState`-ə məlumat ötürən kimi React avtomatik olaraq `StartScreen`-i bağlayır və oyun taxtasını açır.

```jsx
const handleReset = () => {
    handleClearHistory();
    setGameState(null);
    hasPlayed.current = false;
};
```
> - "Start New Game" düyməsinə kliklədikdə bütün tarixçəni silir və istifadəçini ən başdakı giriş ekranına qaytarır.

---

### `ResultModal.jsx` — Ümumi Hesabat

```jsx
const calculateResults = () => {
    const wins = historyList.filter(m => m.winner === 1).length;
    const losses = historyList.filter(m => m.winner === 2).length;
    return { wins, losses, total: historyList.length };
};
```
> - `historyList.filter(...)` → Tarixçədəki bütün oyunları gəzir və qalibiyyət/məğlubiyyətləri sayır.
> - Məsələn: `winner === 1` t1 (istifadəçi tərəfi) qalibiyyətləridir.

---

### `Button.jsx` — Universal Düymə Komponenti

```jsx
const Button = ({ children, variant = "primary", ...props }) => {
```
> - `children` → Düymənin içindəki mətn və ya icon.
> - `variant` → Düymənin rəngi və stilini müəyyən edir (`primary`, `restart`, `endGame`, `ghost`, `outline`).
> - `...props` → Düyməyə verilən bütün digər atributları (`onClick`, `href`, `target` və s.) birbaşa elementə ötürür.

---

## 🎨 CSS Modules & Data Attributes

Artıq layihədə **heç bir inline style (`style={{...}}`) yoxdur**.

```jsx
<div data-type={pokemon.type} className={styles.card}>
```
> - `data-type` → Pokémon-un tipini (məsələn: `fire`) HTML atributu kimi qeyd edir.
> - CSS faylında: `.card[data-type="fire"] { --poke-color: #FF6B35; }`
> - Bu metod sayəsində hər Pokémon tipi üçün fərqli rənglər tamamilə CSS-də idarə olunur, JavaScript kodu isə təmiz qalır.

---

### 📱 Responziv Dizayn & MacBook Dəstəyi

Tətbiq artıq bütün cihazlara (MacBook, Planşet, Telefon) tam uyğunlaşdırılıb.

#### `App.module.css` — Media Queries

```css
@media (max-width: 1440px) { ... }
```
> - **MacBook/Laptop**: `1440px` ekranlarda `padding` və `gap` dəyərləri azaldılır. Bu, 4 Pokémon kartının ekrana sığmasını və dizayn səliqəliyini təmin edir.

```css
@media (max-width: 1100px) { ... }
```
> - **Tarixçənin Gizlədilməsi**: Ekran `1100px`-dən kiçik olduqda `sidebarContainer` üçün `display: none` tətbiq edilir. Bu, diqqəti tamamilə oyuna yönəltmək üçün Match History-ni gizlədir.
> - **Vertical Layout**: `pageWrapper` tək sütun (column) rejiminə keçir və `100vh` hündürlük alır.

---

### `TeamSection.module.css` — Stabillik və Mobil Görünüş

```css
.cardGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
```
> - **4-Sütunlu Grid**: Hər komandada həmişə 4 kartın yanaşı olması üçün `grid-template-columns: repeat(4, 1fr)` istifadə olunur.
> - **Horizontal Scroll**: Planşet ekranlarında (`700px - 1100px`) kartlar aşağıya sürüşmür, əksinə **üfüqi (horizontal) scroll** yaranır. Bu, dizaynın stabilliyini qoruyur.

```css
@media (max-width: 700px) {
  .cardGrid { grid-template-columns: 1fr; }
}
```
> - **Mobil Stack (< 700px)**: Telefon ekranlarında kartlar artıq yanaşı deyil, **üst-üstə (alt-alta)** düzülür. Bu, hər kartın tam ölçüdə görünməsini təmin edir.

---

### 🖱️ Xüsusi Scrollbar (Custom Scrollbar)

Loyihəyə premium görünüş verən **custom scrollbar** əlavə edilib.

#### `index.css` — Webkit Stilləri

```css
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #f1f1f1; }
::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
```
> - **Premium Görünüş**: Brauzerin standart boz scrollbar-ı əvəzinə, Pokedex mövzusuna uyğun dairəvi və minimalist bir dizayn tətbiq olunub.
> - **App.module.css**-də `height: 100vh; overflow-y: auto;` köməyi ilə bu scrollbar bütün mobil və desktop rejimlərində aktivdir.

---

## 💎 Yekun
Bu layihə artıq tam mütəşəkkil, təmiz kodlu (**Zero Inline CSS**) və bütün cihazlarda mükəmməl görünən bir React tətbiqidir.
```
