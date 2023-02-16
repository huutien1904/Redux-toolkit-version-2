  import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "pages/blog/components/blog.reducer";

  export const store = configureStore({
    reducer:{
      blog : blogReducer
    }
  })

  // lấy Roóttate và AppDispath từ store của chúng ta

  export type RootState = ReturnType<typeof store.getState>

  export type AppDispath = typeof store.dispatch