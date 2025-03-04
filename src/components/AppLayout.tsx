import React from "react";
import Header from "./Header";
import NewsList from "./NewsList";
import styles from "./AppLayout.module.scss";

const AppLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <NewsList />
    </div>
  );
};

export default AppLayout;
