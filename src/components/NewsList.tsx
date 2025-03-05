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
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const { data, isLoading, error } = useGetNewsByDateQuery({
    month,
    year,
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

  const groupedNews: Record<string, typeof displayedNews> =
    displayedNews.reduce((acc, article) => {
      const date = new Date(article.pub_date).toLocaleDateString("ru-RU"); // Преобразуем в `5.03.25`
      if (!acc[date]) acc[date] = []; // Если даты еще нет в объекте → создаем массив
      acc[date].push(article); // Добавляем новость в соответствующую дату
      return acc;
    }, {} as Record<string, typeof displayedNews>);

  return (
    <div className={styles.newsList}>
      {Object.entries(groupedNews).map(([date, articles]) => (
        <div key={date}>
          <h2 className={styles.date}>{`News for ${date}`}</h2>{" "}
          {/* Заголовок даты */}
          <ul>
            {articles.map((article) => (
              <NewsItem
                key={article._id}
                title={article.abstract}
                url={article.web_url}
                source={article.source}
                date={article.pub_date}
              />
            ))}
          </ul>
        </div>
      ))}
      <button onClick={handleLoadMore}>Загрузить еще</button>
    </div>
  );
};

export default NewsList;
