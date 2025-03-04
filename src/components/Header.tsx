import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton}>&#9776;</button>
      <h1 className={styles.title}>Besider</h1>
    </header>
  );
};

export default Header;
