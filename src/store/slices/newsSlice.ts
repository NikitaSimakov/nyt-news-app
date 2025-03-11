import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NewsArticle } from "../../types/article.type";

interface NewsState {
  allNews: NewsArticle[];
  displayedNews: NewsArticle[];
  newsLimit: number;
}

const initialState: NewsState = {
  allNews: [],
  displayedNews: [],
  newsLimit: 100,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setAllNews(state, action: PayloadAction<NewsArticle[]>) {
      const reversedNews = [...action.payload].reverse().slice(0, 300);

      state.allNews = [...state.allNews, ...reversedNews];

      state.newsLimit = 100;
      state.displayedNews = state.allNews.slice(0, state.newsLimit);
    },
    loadMoreNews(state) {
      const nextNews = state.allNews.slice(
        state.newsLimit,
        state.newsLimit + 100
      );

      if (nextNews.length > 0) {
        const uniqueNextNews = nextNews.filter(
          (article) =>
            !state.displayedNews.some(
              (existingArticle) => existingArticle._id === article._id
            )
        );

        if (uniqueNextNews.length > 0) {
          state.displayedNews = [...state.displayedNews, ...uniqueNextNews];
          state.newsLimit += 100;
        }
      }
    },
  },
});

export const { setAllNews, loadMoreNews } = newsSlice.actions;
export default newsSlice.reducer;
