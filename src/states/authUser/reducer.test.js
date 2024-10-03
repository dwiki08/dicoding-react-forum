import { describe, expect, it } from "vitest";
import { ActionType } from "./action";
import authUserReducer from "./reducer";

/**
* test scenario for threadReducer
*
* - authUserReducer function
*  - should return the initial state when given by unknown action
*  - should return user object when given by ActionType.SET_AUTH_USER action
*  - should return null authUser when given by ActionType.UNSET_AUTH_USER action
* 
*/

const dummyAuthUser = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

describe("authUserReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = dummyAuthUser;
    const action = { type: "UNKNOWN" };
    // action
    const nextState = authUserReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return user object when given by ActionType.SET_AUTH_USER action", () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: dummyAuthUser,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return null authUser when given by ActionType.UNSET_AUTH_USER action", () => {
    // arrange
    const initialState = dummyAuthUser;
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
