import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";
import api from "../../utils/api";
import { asyncPopulateUsersAndThreads } from "./action";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { getUsersActionCreator } from "../users/action";
import { getThreadsActionCreator } from "../threads/action";

/**
 * skenario test
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeErrorResponse = new Error("Ups, something went wrong");

const fakeUsersResponse = {
  status: "success",
  message: "ok",
  data: {
    users: [
      {
        id: "john_doe",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      {
        id: "jane_doe",
        name: "Jane Doe",
        email: "jane@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      {
        id: "fulan",
        name: "Si Fulan",
        email: "fulan@example.com",
        avatar: "https://generated-image-url.jpg",
      },
    ],
  },
};

const fakeThreadsResponse = {
  status: "success",
  message: "ok",
  data: {
    threads: [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: "thread-2",
        title: "Thread Kedua",
        body: "Ini adalah thread kedua",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-2",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ],
  },
};

describe("asyncPopulateUsersAndThreads thunk", () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getThreads = api.getThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getThreads = api._getThreads;

    // delete backup data
    delete api._getAllUsers;
    delete api._getThreads;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getThreads = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      getThreadsActionCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      getUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call alert correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllTalks = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
