import React, { useEffect, useRef, useState } from "react";
import { useGetNewsByDateQuery } from "../services/nytApi";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import styles from "./NewsList.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { loadMoreNews, setAllNews } from "../store/slices/newsSlice";
import { getPreviousMonth } from "../utils/dateHelpers";
import { groupNewsByDate } from "../utils/newsHelpers";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { displayedNews, allNews } = useAppSelector((state) => state.news);
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const fetchMoreRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = () => {
    const newDate = getPreviousMonth(year, month);
    setYear(newDate.year);
    setMonth(newDate.month);
  };

  const { data, isLoading, isFetching } = useGetNewsByDateQuery({
    month,
    year,
  });

  useEffect(() => {
    if (data) {
      dispatch(setAllNews(data.response.docs));
    }
  }, [data, dispatch]);

  useIntersectionObserver(
    loadMoreRef,
    () => {
      if (displayedNews.length < allNews.length) {
        dispatch(loadMoreNews());
      }
    },
    [displayedNews, allNews, dispatch]
  );
  useIntersectionObserver(
    fetchMoreRef,
    () => {
      const remainingNews = allNews.length - displayedNews.length;

      if (remainingNews <= 100 && !isFetching) {
        handleLoadMore();
      }
    },
    [displayedNews, allNews, month, year, isFetching]
  );

  if (isLoading) return <Loader />;

  return (
    <div className={styles.newsList}>
      {Object.entries(groupNewsByDate(displayedNews)).map(
        ([date, articles]) => (
          <div key={date}>
            <h2 className={styles.date}>{`Новости за ${date}`}</h2>
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
              {isFetching && <Loader />}
            </ul>
          </div>
        )
      )}
      <div ref={loadMoreRef} className={styles.observer}></div>{" "}
      <div ref={fetchMoreRef} className={styles.observer}></div>{" "}
    </div>
  );
};

export default NewsList;
