import { useState } from 'react';
import { Button, TextField, Box, Modal, Typography } from '@mui/material';

import { createPost } from '../../api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalNewPost({ open, handleClose, setNewPost }) {
    const [form, setForm] = useState({
        title: '',
        body: ''
    })

    const handleCreatePost = async () => {

        if (form?.title !== "") {
            const formData = {
                ...form,
                userId: 1
            }

            try {
                const response = await createPost(formData)
                if (response?.status === 201) {
                    handleClose()
                    setNewPost(response?.data)
                    alert("Create new post successfully")
                } else {
                    alert("Create new post error")
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            alert("Title can't be empty")
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{ mb: 4 }}>Create Post</Typography>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField onChange={(e) => setForm({ ...form, title: e.target.value })} value={form?.title} id="outlined-basic" label="Title" variant="outlined" />

                    <TextField onChange={(e) => setForm({ ...form, body: e.target.value })} value={form?.body} sx={{ mt: 2 }} id="outlined-basic" label="Description" variant="outlined" />

                    <Box sx={{ mt: 4 }}>
                        <Button onClick={handleClose} sx={{ mr: 2 }} variant="outlined">Cancel</Button>
                        <Button onClick={handleCreatePost} variant="contained">Create Post</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
