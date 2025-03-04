import React from "react";
import styles from "./NewsItem.module.scss";

interface NewsItemProps {
  title: string;
  url: string;
  image?: string;
  source: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ title, url, image, source }) => {
  return (
    <div className={styles.newsItem}>
      {/* {image && <img src={image} alt={title} className={styles.image} />} */}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.source}>{source}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        Читать далее
      </a>
    </div>
  );
};

export default NewsItem;
