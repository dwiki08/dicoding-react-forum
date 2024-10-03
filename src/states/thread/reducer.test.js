import { describe, it, expect } from "vitest";
import threadReducer from "./reducer";
import { ActionType } from "./action";

/**
* test scenario for threadReducer
*
* - threadReducers function
*  - should return the initial state when given by unknown action
*  - should return the thread detail when given by ActionType.GET_THREAD action
*  - should return null when given by ActionType.GET_THREAD action
*  - should return thread upvoted by given user id state when given by ActionType.UP_VOTE_THREAD action
*  - should return thread downvoted by given user id state when given by ActionType.DOWN_VOTE_THREAD action
*  - should return thread neutralized from voted by given user id state when given by ActionType.NEUTRALIZE_VOTE_THREAD action
*  - should return thread with added comment when given by ActionType.POST_COMMENT_THREAD action
*  - should return comment upvoted by given user id state when given by ActionType.UP_VOTE_COMMENT_THREAD action
*  - should return comment downvoted by given user id state when given by ActionType.DOWN_VOTE_COMMENT_THREAD action
*  - should return comment neutralized from voted by given user id state when given by ActionType.NEUTRALIZE_VOTE_COMMENT_THREAD action
* 
*/

const initialStateThread = {
  id: "thread-1",
  title: "Thread Pertama",
  body: "Ini adalah thread pertama",
  category: "General",
  createdAt: "2021-06-21T07:00:00.000Z",
  owner: {
    id: "users-1",
    name: "John Doe",
    avatar: "https://generated-image-url.jpg",
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const dummyComment = {
  id: "comment-1",
  content: "Ini adalah komentar pertama",
  createdAt: "2021-06-21T07:00:00.000Z",
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: "users-1",
    name: "John Doe",
    email: "john@example.com",
  },
};

describe("threadReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the thread detail when given by ActionType.GET_THREAD action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.GET_THREAD,
      payload: {
        thread: initialStateThread,
      },
    };

    // action
    const nextState = threadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.thread);
  });

  it("should return null when given by ActionType.CLEAR_THREAD action", () => {
    // arrange
    const initialState = [];
    const action = { type: ActionType.CLEAR_THREAD };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(null);
  });

  it("should return thread upvoted by given user id state when given by ActionType.UP_VOTE_THREAD action", () => {
    // arrange
    const initialState = initialStateThread;
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "users-1",
      },
    };
    const expected = {
      ...initialState,
      upVotesBy: ["users-1"],
    };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return thread downvoted by given user id state when given by ActionType.DOWN_VOTE_THREAD action", () => {
    // arrange
    const initialState = initialStateThread;
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "users-1",
      },
    };
    const expected = {
      ...initialState,
      downVotesBy: ["users-1"],
    };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return thread neutralized from voted by given user id state when given by ActionType.NEUTRALIZE_VOTE_THREAD action", () => {
    // arrange
    const initialState = initialStateThread;
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "users-1",
      },
    };
    const expected = {
      ...initialState,
      upVotesBy: [],
    };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return thread with added comment when given by ActionType.POST_COMMENT_THREAD action", () => {
    // arrange
    const initialState = initialStateThread;
    const action = {
      type: ActionType.POST_COMMENT_THREAD,
      payload: {
        comment: dummyComment,
      },
    };
    const expected = {
      ...initialState,
      comments: [dummyComment, ...initialState.comments],
    };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return comment upvoted by given user id state when given by ActionType.UP_VOTE_COMMENT_THREAD action", () => {
    // arrange
    const initialState = {
      ...initialStateThread,
      comments: [dummyComment],
    };
    const action = {
      type: ActionType.UP_VOTE_COMMENT_THREAD,
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };
    const expected = {
      ...initialState,
      comments: [
        {
          ...dummyComment,
          upVotesBy: ["users-1"],
        },
      ],
    };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return comment downvoted by given user id state when given by ActionType.DOWN_VOTE_COMMENT_THREAD action", () => {
    // arrange
    const initialState = {
      ...initialStateThread,
      comments: [dummyComment],
    };
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT_THREAD,
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };
    const expected = {
      ...initialState,
      comments: [
        {
          ...dummyComment,
          downVotesBy: ["users-1"],
        },
      ],
    };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(expected);
  });

  it("should return comment neutralized from voted by given user id state when given by ActionType.NEUTRALIZE_VOTE_COMMENT_THREAD action", () => {
    // arrange
    const initialState = {
      ...initialStateThread,
      comments: [
        {
          ...dummyComment,
          downVotesBy: ["users-1"],
        },
      ],
    };
    const action = {
      type: ActionType.NEUTRALIZE_VOTE_COMMENT_THREAD,
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };
    const expected = {
      ...initialState,
      comments: [dummyComment],
    };
    // action
    const nextState = threadReducer(initialState, action);
    // assert
    expect(nextState).toEqual(expected);
  });
});
