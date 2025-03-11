import React from "react";
import Header from "./Header";
import NewsList from "./NewsList";
import styles from "./AppLayout.module.scss";
import NewsItem from "./NewsItem";

const AppLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <NewsList />
      {/* <NewsItem
        date="2024-02-01T00:02:20+0000"
        title="Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours"
        url="/"
        source="CNN"
      />
      <NewsItem
        date="2024-02-01T00:02:20+0000"
        title="Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours"
        url="/"
        source="CNN"
      />
      <NewsItem
        date="2024-02-01T00:02:20+0000"
        title="Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours"
        url="/"
        source="CNN"
      /> */}
    </div>
  );
};

export default AppLayout;
