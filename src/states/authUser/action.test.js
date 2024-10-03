import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import api from "../../utils/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  asyncSetAuthUser,
  setAuthUserActionCreator,
} from "./action";

/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeErrorResponse = new Error("Ups, something went wrong");
const fakeLoginResponse = {
  status: "success",
  message: "ok",
  data: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  },
};
const fakeProfileResponse = {
  status: "success",
  message: "ok",
  data: {
    user: {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
  },
};

describe("asyncSetAuthUser thunk", () => {
  beforeEach(() => {
    api._login = api.login;
    api._getProfile = api.getProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getProfile = api._getProfile;

    // delete backup data
    delete api._login;
    delete api._getProfile;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse.data.token);
    api.getProfile = () => Promise.resolve(fakeProfileResponse.data.user);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser({ email: "email", password: "password" })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeProfileResponse.data.user)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser({ email: "email", password: "password" })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
