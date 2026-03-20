import styles from "./ClearButton.module.css";

function ClearButton({ onClick, text = "Clear History" }) {
  return (
    <button className={styles.clearBtn} onClick={onClick}>
      {text}
    </button>
  );
}

export default ClearButton;
