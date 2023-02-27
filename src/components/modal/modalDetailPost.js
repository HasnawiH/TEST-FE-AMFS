import { useState, useEffect } from 'react';
import { Box, Typography, Modal, MenuItem, Divider, TextField, Button } from '@mui/material';

import { fetchComment, createComment, deleteComment, deletePost } from '../../api';
import ListComment from '../list-comment';
import Iconify from '../iconify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: "80vh",
    maxHeight: "80vh",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: "scroll"
};

export default function ModalDetailPost({ open, handleClose, handleClickEdit, setNewPost, data }) {
    const { id, title, body } = data;

    const [listComments, setListComments] = useState([]);
    const [textComment, setTextComment] = useState("")

    const handleCreateComments = async () => {
        const response = await createComment(id, { body: textComment, email: "hasnawihaeba@gmail.com", name: "Hasnawi H" });
        if (response?.status === 201) {
            alert("Create comment sucsesfully")
            setTextComment("")
            setListComments([...listComments, response?.data])
        }
    }

    const handleDeletePost = async () => {
        const response = await deletePost(id)
        if (response?.status === 200) {
            alert("Delete post sucsesfully");
            setNewPost()
            handleClose()
        }
    }

    const handleDeleteComment = (idComment) => {
        const filterComment = listComments.filter((comment) => comment.id !== idComment);
        setListComments([...filterComment])
        alert("Delete comment sucsesfully");
    }

    const handleFetchComments = async () => {
        const response = await fetchComment(id);
        if (response?.status === 200) {
            setListComments(response?.data)
        }
    }

    useEffect(() => {
        handleFetchComments()
    }, [id])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>Detail Post</Typography>
                    <Box sx={{ display: "flex" }}>
                        <MenuItem onClick={handleClickEdit}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                            Edit
                        </MenuItem>

                        <MenuItem onClick={handleDeletePost} sx={{ color: 'error.main' }}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                            Delete
                        </MenuItem>
                    </Box>
                </Box>


                <Divider sx={{ my: 4 }} />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ mb: 4, fontWeight: 600 }}>{title}</Typography>
                    <Typography>{body}</Typography>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box>
                    Comments
                    <ListComment comments={listComments} handleClickDelete={(id) => handleDeleteComment(id)} />

                    <Box sx={{ mt: 4, display: "flex", alignItems: "center" }} >
                        <TextField onChange={(e) => setTextComment(e.target.value)} value={textComment} sx={{ width: "100%", mr: 2 }} id="outlined-basic" label="Type comment here..." variant="outlined" />
                        <Button onClick={handleCreateComments} variant='outlined' >Send</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
