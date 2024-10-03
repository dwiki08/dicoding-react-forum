import PropTypes from "prop-types";
import parser from 'html-react-parser';
import { Avatar, Card, CardActions, CardContent, Divider, Grid2, IconButton, Typography } from "@mui/material";
import { MdOutlineThumbUp, MdOutlineThumbDown, MdThumbUp, MdThumbDown } from "react-icons/md";
import { userShape } from '../model_shapes';
import postedAt from "../utils";

export default function CommentItem({
    id,
    content,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    backgroundColor,
    authUserId,
    onUpVoteComment,
    onDownVoteComment,
    onNeuturalizeComment
}) {
    const isUpVoted = upVotesBy.includes(authUserId);
    const isDownVoted = downVotesBy.includes(authUserId);

    function onNeuturalizeClick() {
        onNeuturalizeComment(id);
    }

    function onUpVoteClick() {
        onUpVoteComment(id);
    }

    function onDownVoteClick() {
        onDownVoteComment(id);
    }

    return (
        <Card sx={{ backgroundColor: backgroundColor, mb: 2 }}>
            <CardContent>
                <Grid2 container sx={{ pb: 2 }}>
                    <Avatar
                        alt="Avatar Icon"
                        src={owner.avatar}
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography variant="body" sx={{ fontWeight: 'bold', alignContent: 'center' }}>
                        {owner.name}
                    </Typography>
                </Grid2>
                <Typography variant="body" component="span">
                    {parser(content)}
                </Typography>
            </CardContent>
            <CardActions sx={{ mx: 1 }}>
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

                <Divider sx={{ flex: 1 }} />

                <Typography variant="body2">
                    {postedAt(createdAt)}
                </Typography>
            </CardActions>
        </Card>
    )
}

CommentItem.propTypes = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    owner: PropTypes.shape(userShape).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    authUserId: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    onUpVoteComment: PropTypes.func.isRequired,
    onDownVoteComment: PropTypes.func.isRequired,
    onNeuturalizeComment: PropTypes.func.isRequired
}