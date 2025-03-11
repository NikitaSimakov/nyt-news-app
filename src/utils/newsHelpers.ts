import { NewsArticle } from "../types/article.type";

export const groupNewsByDate = (news: NewsArticle[]) => {
  return news.reduce((acc, article) => {
    const date = new Date(article.pub_date).toLocaleDateString("ru-RU");
    if (!acc[date]) acc[date] = [];
    acc[date].push(article);
    return acc;
  }, {} as Record<string, NewsArticle[]>);
};
