import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsItemProps } from "../../components/NewsItem";

interface NewsState {
  allNews: NewsItemProps[];
  displayedNews: NewsItemProps[];
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
    setAllNews(state, action: PayloadAction<NewsItemProps[]>) {
      state.allNews = action.payload;
      state.displayedNews = action.payload.slice(0, state.newsLimit);
    },
    loadMoreNews(state) {
      state.newsLimit += 10;
      state.displayedNews = state.allNews.slice(0, state.newsLimit);
    },
  },
});

export const { setAllNews, loadMoreNews } = newsSlice.actions;
export default newsSlice.reducer;
