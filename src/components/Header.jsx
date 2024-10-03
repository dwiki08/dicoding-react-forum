import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { MdLogout, MdOutlineLeaderboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { unsetAuthUser } from "../states/authUser/action";
import { HOME_PAGE_PATH, LEADERBOARDS_PAGE_PATH } from "../utils/RoutePath";

export default function Header() {
    const { authUser } = useSelector((states) => states);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onLogout() {
        dispatch(unsetAuthUser());
        navigate(HOME_PAGE_PATH);
    };

    function onLeaderboardsClick() {
        navigate(LEADERBOARDS_PAGE_PATH);
    }

    return (
        <Box sx={{ pb: 10 }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                        <Link to={HOME_PAGE_PATH} style={{ textDecoration: 'none', color: 'white' }}>
                            Dicoding Forum
                        </Link>
                    </Typography>
                    {
                        authUser &&
                        <>
                            <IconButton aria-label="Leaderboard" onClick={onLeaderboardsClick}>
                                <MdOutlineLeaderboard color="white" />
                            </IconButton>
                            <Box width={24} />
                            <Avatar
                                alt="Avatar Icon"
                                src={authUser.avatar}
                                sx={{ width: 40, height: 40, mr: 2 }}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    backgroundColor: '#990632',
                                    textTransform: 'none'
                                }}
                                startIcon={<MdLogout />}
                                onClick={onLogout}
                            >
                                Logout
                            </Button>
                        </>
                    }
                </Toolbar>
                <Loading />
            </AppBar>
        </Box>
    );
}