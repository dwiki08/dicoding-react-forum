import { ActionType } from "./action";

function threadReducer(thread = null, action = {}) {
  switch (action.type) {
    case ActionType.GET_THREAD:
      return action.payload.thread;
    case ActionType.CLEAR_THREAD:
      return null;
    case ActionType.UP_VOTE_THREAD:
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.includes(action.payload.userId)
          ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
          : thread.upVotesBy.concat([action.payload.userId]),
        downVotesBy: thread.downVotesBy.includes(action.payload.userId)
          ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
          : thread.downVotesBy,
      };
    case ActionType.DOWN_VOTE_THREAD:
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.includes(action.payload.userId)
          ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
          : thread.upVotesBy,
        downVotesBy: thread.downVotesBy.includes(action.payload.userId)
          ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
          : thread.downVotesBy.concat([action.payload.userId]),
      };
    case ActionType.NEUTRALIZE_VOTE_THREAD:
      return {
        ...thread,
        upVotesBy: thread.upVotesBy.includes(action.payload.userId)
          ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
          : thread.upVotesBy,
        downVotesBy: thread.downVotesBy.includes(action.payload.userId)
          ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
          : thread.downVotesBy,
      };
    case ActionType.POST_COMMENT_THREAD:
      return {
        ...thread,
        comments: [action.payload.comment, ...thread.comments],
      };
    case ActionType.UP_VOTE_COMMENT_THREAD:
      return {
        ...thread,
        comments: thread.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.upVotesBy.concat([action.payload.userId]),
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.downVotesBy,
              }
            : comment
        ),
      };
    case ActionType.DOWN_VOTE_COMMENT_THREAD:
      return {
        ...thread,
        comments: thread.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
                ...comment,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.downVotesBy.concat([action.payload.userId]),
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.upVotesBy,
              }
            : comment
        ),
      };
    case ActionType.NEUTRALIZE_VOTE_COMMENT_THREAD:
      return {
        ...thread,
        comments: thread.comments.map((comment) =>
          comment.id === action.payload.commentId
            ? {
                ...comment,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.downVotesBy,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter(
                      (id) => id !== action.payload.userId
                    )
                  : comment.upVotesBy,
              }
            : comment
        ),
      };
    default:
      return thread;
  }
}

export default threadReducer;
