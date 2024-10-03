export const ANY_PATH = "*";
export const HOME_PAGE_PATH = "/";
export const LOGIN_PAGE_PATH = "/login";
export const REGISTER_PAGE_PATH = "/register";
export const THREAD_DETAIL_PAGE_PATH = (threadId = null) => {
  return threadId === null ? "/thread/:threadId" : `/thread/${threadId}`;
};
export const LEADERBOARDS_PAGE_PATH = "/leaderboards";
export const CREATE_THREAD_PAGE_PATH = "/create";
