import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { getThreadsActionCreator } from "../threads/action";
import { getUsersActionCreator } from "../users/action";
import { clearThreadActionCreator } from "../thread/action";

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      dispatch(clearThreadActionCreator());
      
      const users = await api.getAllUsers();
      const threads = await api.getThreads();

      dispatch(getUsersActionCreator(users));
      dispatch(getThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { asyncPopulateUsersAndThreads };
