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
  newsLimit: 10,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setAllNews(state, action: PayloadAction<NewsArticle[]>) {
      state.allNews = action.payload; // Храним полный список новостей
      state.newsLimit = 10; // Начальное количество новостей
      state.displayedNews = [
        ...state.allNews.slice(-state.newsLimit),
      ].reverse(); // Последние 10 новостей (свежие сверху)
    },

    loadMoreNews(state) {
      const nextNews = state.allNews.slice(
        state.newsLimit,
        state.newsLimit + 10
      ); // Берем следующую порцию

      if (nextNews.length > 0) {
        state.displayedNews = [...state.displayedNews, ...nextNews]; // Добавляем новости в КОНЕЦ списка
        state.newsLimit += 10; // Увеличиваем лимит
      }
    },
  },
});

export const { setAllNews, loadMoreNews } = newsSlice.actions;
export default newsSlice.reducer;
