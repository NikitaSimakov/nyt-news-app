import React from "react";
import styles from "./NewsItem.module.scss";
import { format, parseISO } from "date-fns";

export interface NewsItemProps {
  title: string;
  url: string;
  // image?: string;
  source: string;
  date: string;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  url,
  // image,
  source,
  date,
}) => {
  return (
    <div className={styles.newsItem}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        // className={styles.link}
      >
        {/* {image && <img src={image} alt={title} className={styles.image} />} */}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.source}>{source}</p>
        {/* <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Читать далее
      </a> */}
        <p>{format(parseISO(date), "MMM dd, yyyy, hh.mm a")}</p>
      </a>
    </div>
  );
};

export default NewsItem;
