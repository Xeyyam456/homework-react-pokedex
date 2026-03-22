import styles from "./Button.module.css";

function Button({ children, onClick, type = "button", variant = "primary", className = "", href, target, rel }) {
  const combinedClassName = `${styles.button} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}

export default Button;
