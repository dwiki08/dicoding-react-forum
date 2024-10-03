import { describe, it, expect } from "vitest";
import { ActionType } from "../threads/action";
import threadsReducer from "./reducer";

/**
* test scenario for threadReducer
*
* - threadsReducer function
*  - should return the initial state when given by unknown action
*  - should return threads state when given by ActionType.GET_THREADS action
*  - should return added thread in threads state when given by ActionType.CREATE_THREAD action
*  - should return threads upvoted by given user id state when given by ActionType.UP_VOTE_THREAD action
*  - should return threads downvoted by given user id state when given by ActionType.DOWN_VOTE_THREAD action
*  - should return threads neutralize from vote by given user id state when given by ActionType.NEUTRALIZE_VOTE_THREAD action
* 
*/

const dummyThreads = [
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
];

const dummyThread = {
  id: "thread-23",
  title: "Thread Ketiga",
  body: "Ini adalah thread ketida",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  ownerId: "users-2",
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

describe("threadsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return threads state when given by ActionType.GET_THREADS action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.GET_THREADS,
      payload: {
        threads: dummyThreads,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return added thread in threads state when given by ActionType.CREATE_THREAD action", () => {
    // arrange
    const initialState = dummyThreads;
    const action = {
      type: ActionType.GET_THREADS,
      payload: {
        threads: [...dummyThreads, dummyThread],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return threads upvoted by given user id state when given by ActionType.UP_VOTE_THREAD action", () => {
    // arrange
    const initialState = [dummyThread];
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: "thread-23",
        userId: "users-1",
      },
    };
    const expected = [{ ...dummyThread, upVotesBy: ["users-1"] }];

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return threads downvoted by given user id state when given by ActionType.DOWN_VOTE_THREAD action", () => {
    // arrange
    const initialState = [dummyThread];
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: "thread-23",
        userId: "users-1",
      },
    };
    const expected = [{ ...dummyThread, downVotesBy: ["users-1"] }];

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return threads neutralize from vote by given user id state when given by ActionType.NEUTRALIZE_VOTE_THREAD action", () => {
    // arrange
    const initialState = [{ ...dummyThread, downVotesBy: ["users-1"] }];
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: {
        threadId: "thread-23",
        userId: "users-1",
      },
    };
    const expected = [dummyThread];

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(expected);
  });
});
