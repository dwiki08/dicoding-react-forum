import parser from 'html-react-parser';
import postedAt from "../utils";
import { Avatar, Box, Card, CardActions, CardContent, Divider, Grid2, IconButton, Typography } from "@mui/material";
import { MdOutlineThumbUp, MdOutlineThumbDown, MdThumbUp, MdThumbDown, MdComment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { THREAD_DETAIL_PAGE_PATH } from "../utils/RoutePath";
import { threadItemShape } from '../model_shapes';

export default function ThreadItem({
    id,
    title,
    body,
    category,
    createdAt,
    upVotesBy,
    downVotesBy,
    totalComments,
    threadOwner,
    authUserId,
    onUpVote,
    onDownVote,
    onNeuturalizeVote,
    showFull = false,
    isHandleClick = true
}) {
    const navigate = useNavigate();

    const isUpVoted = upVotesBy.includes(authUserId);
    const isDownVoted = downVotesBy.includes(authUserId);

    function onThreadClick() {
        if (isHandleClick) navigate(THREAD_DETAIL_PAGE_PATH(id));
    };

    function onNeuturalizeClick() {
        onNeuturalizeVote(id);
    }

    function onUpVoteClick() {
        onUpVote(id);
    }

    function onDownVoteClick() {
        onDownVote(id);
    }

    return (
        <Card sx={{ mb: 4 }}>
            <CardContent onClick={onThreadClick} sx={isHandleClick ? { cursor: 'pointer' } : { cursor: 'default' }}>
                <Grid2 container sx={{ pb: 2 }}>
                    <Avatar
                        alt="Avatar Icon"
                        src={threadOwner.avatar}
                        sx={{ width: 40, height: 40, mr: 2 }}
                    />
                    <Typography sx={{ fontSize: 18, fontWeight: 'bold', alignContent: 'center' }}>
                        {threadOwner.name}
                    </Typography>
                </Grid2>
                <Typography gutterBottom variant="h3" component="div" fontSize={24} sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <Typography
                    variant="body"
                    component="span"
                    sx={showFull
                        ? { overflow: "visible" }
                        : {
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "4",
                            WebkitBoxOrient: "vertical"
                        }
                    }
                >
                    {parser(body)}
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body" color="primary">
                        {`#${category}`}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ mx: 1, mb: 2 }}>
                {
                    isUpVoted
                        ? <>
                            <IconButton size="small" color="inherit" onClick={onNeuturalizeClick}>
                                <MdThumbUp />
                            </IconButton>
                        </>
                        : <>
                            <IconButton size="small" color="inherit" onClick={onUpVoteClick}>
                                <MdOutlineThumbUp />
                            </IconButton>
                        </>
                }
                <Typography variant="body2">{upVotesBy.length}</Typography>

                {
                    isDownVoted
                        ? <>
                            <IconButton size="small" color="inherit" onClick={onNeuturalizeClick} >
                                <MdThumbDown />
                            </IconButton>
                        </>
                        : <>
                            <IconButton size="small" color="inherit" onClick={onDownVoteClick}>
                                <MdOutlineThumbDown />
                            </IconButton>
                        </>
                }
                <Typography variant="body2">{downVotesBy.length}</Typography>

                <Divider width={4} />

                {
                    totalComments &&
                    <>
                        <MdComment />
                        <Typography variant="body2">{totalComments}</Typography>
                    </>
                }

                <Divider sx={{ flex: 1 }} />

                <Typography variant="body2">
                    {postedAt(createdAt)}
                </Typography>
            </CardActions>
        </Card>
    );
}

ThreadItem.propTypes = threadItemShape;
