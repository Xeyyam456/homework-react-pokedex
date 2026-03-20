import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Pokedex
      </h1>
    </div>
  );
}

export default Header;