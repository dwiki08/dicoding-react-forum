import { Button, Card, CardContent, CardHeader, Container, Grid2, TextField } from "@mui/material";
import useInput from "../hooks/UseInput";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_PATH } from "../utils/RoutePath";
import { asyncCreateThread } from "../states/threads/action";

export default function CreateThreadPage() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [title, onTitleChange] = useInput('');
    const [content, onContentChange] = useInput('');
    const [category, onCategoryChange] = useInput('');

    function onCreateClick() {
        dispatch(asyncCreateThread({ title: title, body: content, category: category }));
        navigate(HOME_PAGE_PATH);
    }

    return (
        <Container maxWidth="md">
            <Card sx={{ mb: 4 }}>
                <CardHeader title='Create a thread' />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={title}
                        onChange={onTitleChange}
                    />
                    <TextField
                        fullWidth
                        label="Category"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={category}
                        onChange={onCategoryChange}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={8}
                        label="Content"
                        placeholder="Your content here..."
                        variant="outlined"
                        sx={{ mb: 4 }}
                        value={content}
                        onChange={onContentChange}
                    />
                    <Grid2 container justifyContent={'flex-end'}>
                        <Button variant="contained" color="primary" onClick={onCreateClick}>
                            Create
                        </Button>
                    </Grid2>
                </CardContent>
            </Card>
        </Container>
    );
}