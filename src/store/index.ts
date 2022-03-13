import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "./flights";
// import { Provider } from "react-redux";
// ...

export const store = configureStore({
  reducer: {
    flights: flightsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// export default Provider = () => {};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
