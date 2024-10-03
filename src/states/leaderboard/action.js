import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  GET_LEADERBOARDS: "GET_LEADERBOARDS",
};

function getLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.GET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(getLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, asyncGetLeaderboards };
