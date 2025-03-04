import React from "react";
import { useGetNewsByDateQuery } from "../services/nytApi";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import styles from "./NewsList.module.scss";

const NewsList: React.FC = () => {
  const { data, error, isLoading } = useGetNewsByDateQuery({
    year: 2024,
    month: 2,
  });

  if (isLoading) return <Loader />;
  if (error) return <p className={styles.error}>Ошибка загрузки данных</p>;

  const articles = data?.response?.docs || [];

  return (
    <div className={styles.newsList}>
      {articles.map((article: any) => (
        <NewsItem
          key={article._id}
          title={article.abstract}
          url={article.web_url}
          image={article.multimedia?.[0]?.url}
          source={article.source}
        />
      ))}
    </div>
  );
};

export default NewsList;
