import React from "react";
import styles from "./NewsItem.module.scss";
import { format, parseISO } from "date-fns";
import type { NewsItemProps } from "../types/newsItem.type";

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  url,
  // image,
  source,
  date,
}) => {
  return (
    <li className={styles.newsItem}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <img src="../../public/default.png" alt="Изображение" />
        {/* {image && <img src={image} alt={title} className={styles.image} />} */}
        <div>
          <p className={styles.source}>{source}</p>
          <p className={styles.title}>{title}</p>

          <p className={styles.date}>
            {format(parseISO(date), "MMM dd, yyyy, hh.mm a")}
          </p>
        </div>
      </a>
    </li>
  );
};

export default NewsItem;
