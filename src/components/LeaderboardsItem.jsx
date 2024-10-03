import { Avatar, Grid2, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function LeaderboardsItem({ name, avatar, score }) {
    return (
        <Grid2 container sx={{ mb: 2, mx: 2 }}>
            <Avatar
                alt="Avatar Icon"
                src={avatar}
                sx={{ width: 40, height: 40, mr: 2, alignContent: 'center' }}
            />
            <Typography sx={{ alignContent: 'center', flex: 1 }}>
                {name}
            </Typography>
            <Typography color="primary" sx={{ fontSize: 20, fontWeight: 'bold' }}>
                {score}
            </Typography>
        </Grid2>
    )
}

LeaderboardsItem.propTypes = {
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired
}