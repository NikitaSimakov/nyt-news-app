import React, { useEffect } from "react";
import { useGetNewsByDateQuery } from "../services/nytApi";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import styles from "./NewsList.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loadMoreNews, setAllNews } from "../store/slices/newsSlice";

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { displayedNews } = useAppSelector((state) => state.news);
  const { data, isLoading, error } = useGetNewsByDateQuery({
    year: 2024,
    month: 2,
  });

  useEffect(() => {
    if (data) {
      dispatch(setAllNews(data.response.docs));
    }
  }, [data]);

  const handleLoadMore = () => {
    dispatch(loadMoreNews());
  };

  if (isLoading) return <Loader />;
  if (error) return <p className={styles.error}>Ошибка загрузки данных</p>;

  return (
    <div className={styles.newsList}>
      {displayedNews.map((article: any) => (
        <NewsItem
          key={article._id}
          title={article.abstract}
          url={article.web_url}
          // image={article.multimedia?.[0]?.url}
          source={article.source}
          date={article.pub_date}
        />
      ))}
      <button onClick={handleLoadMore}>Загрузить еще</button>
    </div>
  );
};

export default NewsList;
