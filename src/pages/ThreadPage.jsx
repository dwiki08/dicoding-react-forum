import { useDispatch, useSelector } from "react-redux";
import ThreadItem from "../components/ThreadItem";
import { asyncGetThread, asyncPostCommentThread, asyncUpVoteCommentThread, asyncDownVoteCommentThread, asyncNeutralizeVoteCommentThread } from '../states/thread/action';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { asyncDownVoteThread, asyncNeutralizeVoteThread, asyncUpVoteThread } from "../states/thread/action";
import { Button, Container, OutlinedInput, Typography } from "@mui/material";
import useInput from "../hooks/UseInput"
import CommentList from "../components/CommentList";

export default function ThreadPage() {
    const { threadId } = useParams();
    const [content, onContentChange, setContent] = useInput();

    const {
        thread = null,
        authUser
    } = useSelector((states) => states);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetThread(threadId));
    }, [dispatch, threadId]);

    function onUpVote(id) {
        dispatch(asyncUpVoteThread(id));
    };

    function onDownVote(id) {
        dispatch(asyncDownVoteThread(id));
    };

    function onNeuturalizeVote(id) {
        dispatch(asyncNeutralizeVoteThread(id));
    };

    function onSendComment() {
        dispatch(asyncPostCommentThread(content));
        setContent('');
    };

    function onUpVoteComment(id) {
        dispatch(asyncUpVoteCommentThread(id));
    }

    function onDownVoteComment(id) {
        dispatch(asyncDownVoteCommentThread(id));
    }

    function onNeutralizeVoteComment(id) {
        dispatch(asyncNeutralizeVoteCommentThread(id));
    }

    if (thread === null) return null;

    return (
        <Container maxWidth='md' sx={{ pb: 2 }}>
            <ThreadItem
                key={thread.id}
                {...thread}
                onUpVote={onUpVote}
                onDownVote={onDownVote}
                onNeuturalizeVote={onNeuturalizeVote}
                threadOwner={thread.owner}
                authUserId={authUser.id}
                showFull={true}
                isHandleClick={false}
            />

            <OutlinedInput
                fullWidth
                multiline
                type="text"
                rows={4}
                placeholder="Write your comment here..."
                value={content}
                onChange={onContentChange}
            />
            <Button fullWidth variant="contained" sx={{ mt: 2, mb: 6 }} onClick={onSendComment}>
                Send
            </Button>

            <Typography sx={{ fontWeight: 'bold', fontSize: 18, mb: 1 }}>
                Comments ({thread.comments.length})
            </Typography>
            <CommentList
                comments={thread.comments}
                userId={authUser.id}
                onUpVoteComment={onUpVoteComment}
                onDownVoteComment={onDownVoteComment}
                onNeutralizeVoteComment={onNeutralizeVoteComment}
            />
        </Container>
    );
};