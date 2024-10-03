import { Card, CardContent, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetLeaderboards } from "../states/leaderboard/action";
import LeaderboardsItem from "../components/LeaderboardsItem";

export default function LeaderboardsPage() {
    const { leaderboards = [] } = useSelector((states) => states);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncGetLeaderboards());
    }, [dispatch])

    return (
        <Container maxWidth='md'>
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h3" sx={{ fontSize: 24, mb: 4, mx: 2, fontWeight: 'bold' }}>
                        Leaderboards
                    </Typography>
                    {leaderboards.map((item) => (
                        <LeaderboardsItem
                            key={item.user.id}
                            name={item.user.name}
                            avatar={item.user.avatar}
                            score={item.score}
                        />
                    ))}
                </CardContent>
            </Card>
        </Container>
    );
}