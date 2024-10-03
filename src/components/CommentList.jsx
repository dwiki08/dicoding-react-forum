import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

export default function CommentList({
    comments,
    userId,
    onUpVoteComment,
    onDownVoteComment,
    onNeutralizeVoteComment
}) {
    return (
        <>
            {comments.map((comment, i) => (
                <CommentItem
                    key={comment.id}
                    {...comment}
                    authUserId={userId}
                    backgroundColor={i % 2 == 0 ? '#F2F2F2' : '#FAFAFA'}
                    onUpVoteComment={onUpVoteComment}
                    onDownVoteComment={onDownVoteComment}
                    onNeuturalizeComment={onNeutralizeVoteComment}
                />
            ))}
        </>
    )
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
    onUpVoteComment: PropTypes.func.isRequired,
    onDownVoteComment: PropTypes.func.isRequired,
    onNeutralizeVoteComment: PropTypes.func.isRequired
}