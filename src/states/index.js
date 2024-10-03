import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import usersReducer from "./users/reducer";
import threadsReducer from "./threads/reducer";
import threadReducer from "./thread/reducer";
import { loadingBarReducer } from "react-redux-loading-bar";
import leaderboardsReducer from "./leaderboard/reducer";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    thread: threadReducer,
    threads: threadsReducer,
    loadingBar: loadingBarReducer,
    leaderboards: leaderboardsReducer,
  },
});

export default store;
