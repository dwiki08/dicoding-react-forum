import { useEffect } from "react";
import { Container, Fab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import ThreadsList from "../components/ThreadList";
import { asyncDownVoteThreads, asyncNeutralizeVoteThreads, asyncUpVoteThreads } from "../states/threads/action";
import { FaPenNib } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CREATE_THREAD_PAGE_PATH } from "../utils/RoutePath";

export default function HomePage() {
    const {
        threads = [],
        users = [],
        authUser,
    } = useSelector((states) => states);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch
        dispatch(asyncPopulateUsersAndThreads());
    }, [dispatch])

    function onUpVote(id) {
        dispatch(asyncUpVoteThreads(id));
    };

    function onDownVote(id) {
        dispatch(asyncDownVoteThreads(id));
    };

    function onNeuturalizeVote(id) {
        dispatch(asyncNeutralizeVoteThreads(id));
    };

    function onCreateThreadClick() {
        navigate(CREATE_THREAD_PAGE_PATH);
    }

    const threadList = threads.map((thread) => ({
        ...thread,
        threadOwner: users.find((user) => user.id === thread.ownerId),
        authUserId: authUser.id
    }));

    return (
        <Container sx={{ position: 'relative' }}>
            <Container maxWidth='md' sx={{ pb: 2 }}>
                <ThreadsList
                    threads={threadList}
                    onUpVote={onUpVote}
                    onDownVote={onDownVote}
                    onNeuturalizeVote={onNeuturalizeVote}
                />
            </Container>
            <Fab color="primary" aria-label="Create a thread" sx={{ position: 'fixed', bottom: 32, right: 32 }} onClick={onCreateThreadClick}>
                <FaPenNib />
            </Fab>
        </Container>
    )
}