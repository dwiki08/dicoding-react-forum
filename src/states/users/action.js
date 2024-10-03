import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  GET_USERS: "GET_USERS",
};

function getUsersActionCreator(users) {
  return {
    type: ActionType.GET_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      alert("Registration success. You can login now.");
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, getUsersActionCreator, asyncRegisterUser };
