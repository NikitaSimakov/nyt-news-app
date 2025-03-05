import React from "react";
import hamburgerIcon from "../assets/hamburger.svg";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* <button className={styles.menuButton}>&#9776;</button> */}
      <button className={styles.menuButton}>
        <img src={hamburgerIcon} alt="Menu" width="20px" height="15.75px" />
      </button>
      <h1 className={styles.title}>Besider</h1>
    </header>
  );
};

export default Header;
