import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { ANY_PATH, CREATE_THREAD_PAGE_PATH, HOME_PAGE_PATH, LEADERBOARDS_PAGE_PATH, REGISTER_PAGE_PATH, THREAD_DETAIL_PAGE_PATH } from './utils/RoutePath';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import ThreadPage from './pages/ThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import CreateThreadPage from './pages/CreateThreadPage';

function App() {
  const {
    authUser,
    isPreload = false,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <Header />
        <Routes>
          <Route path={ANY_PATH} element={<LoginPage />} />
          <Route path={REGISTER_PAGE_PATH} element={<RegisterPage />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path={ANY_PATH} element={<NotFoundPage />} />
        <Route path={HOME_PAGE_PATH} element={<HomePage />} />
        <Route path={THREAD_DETAIL_PAGE_PATH()} element={<ThreadPage />} />
        <Route path={LEADERBOARDS_PAGE_PATH} element={<LeaderboardsPage />} />
        <Route path={CREATE_THREAD_PAGE_PATH} element={<CreateThreadPage />} />
      </Routes>
    </>
  )
}

export default App
