import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  GET_THREAD: "thread/get",
  CLEAR_THREAD: "thread/clear",
  UP_VOTE_THREAD: "thread/upVote",
  DOWN_VOTE_THREAD: "thread/downVote",
  NEUTRALIZE_VOTE_THREAD: "thread/neutralizeVote",
  POST_COMMENT_THREAD: "thread/postComment",
  UP_VOTE_COMMENT_THREAD: "thread/upVoteComment",
  DOWN_VOTE_COMMENT_THREAD: "thread/downVoteComment",
  NEUTRALIZE_VOTE_COMMENT_THREAD: "thread/neutralizeVoteComment",
};

function getThreadActionCreator(thread) {
  return {
    type: ActionType.GET_THREAD,
    payload: {
      thread: thread,
    },
  };
}

function clearThreadActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD,
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function postCommentThreadActionCreator(comment) {
  return {
    type: ActionType.POST_COMMENT_THREAD,
    payload: {
      comment,
    },
  };
}

function upVoteCommentThreadActionCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentThreadActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentThreadActionCreator(commentId, userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncGetThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadActionCreator());
    try {
      const thread = await api.getThread(threadId);
      dispatch(getThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
    dispatch(hideLoading());
  };
}

function asyncPostCommentThread(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { thread } = getState();
    try {
      const comment = await api.postComment({
        threadId: thread.id,
        content: content,
      });
      dispatch(postCommentThreadActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteCommentThread(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { thread, authUser } = getState();
    try {
      await api.upVoteComment({
        threadId: thread.id,
        commentId: commentId,
      });
      dispatch(upVoteCommentThreadActionCreator(commentId, authUser.id));
    } catch (error) {
      alert(error.message);
      dispatch(upVoteCommentThreadActionCreator(commentId, authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteCommentThread(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { thread, authUser } = getState();
    try {
      await api.downVoteComment({
        threadId: thread.id,
        commentId: commentId,
      });
      dispatch(downVoteCommentThreadActionCreator(commentId, authUser.id));
    } catch (error) {
      alert(error.message);
      dispatch(downVoteCommentThreadActionCreator(commentId, authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteCommentThread(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { thread, authUser } = getState();
    try {
      await api.neutralizeVoteComment({
        threadId: thread.id,
        commentId: commentId,
      });
      dispatch(
        neutralizeVoteCommentThreadActionCreator(commentId, authUser.id)
      );
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteCommentThreadActionCreator(commentId, authUser.id)
      );
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getThreadActionCreator,
  clearThreadActionCreator,
  asyncGetThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
  asyncPostCommentThread,
  asyncUpVoteCommentThread,
  asyncDownVoteCommentThread,
  asyncNeutralizeVoteCommentThread,
};
