import { useState, useMemo } from 'react';
import { Button, TextField, Box, Modal, Typography } from '@mui/material';
import { updatePost } from '../../api';

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

export default function ModalEditPost({ open, handleClose, setEditPost, data }) {
    const [form, setForm] = useState({
        title: '',
        body: ''
    })

    const handleEditPost = async () => {  

        if(form?.title !== ""){
            try {
                const response = await updatePost(form);
                if (response?.status === 200 || response?.status === 201 ) {
                    handleClose()
                    setEditPost(response?.data)
                    console.log(response)
                    alert("Update post successfully")
                } else {
                    alert("Update post error")
                }
            } catch (error) {
                console.log(error)
            }
        } else{
            alert("Title can't be empty")
        }
    }

    useMemo(() => {
        setForm(data)
    }, [data])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{mb: 4}}>Edit Post</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField onChange={(e) => setForm({ ...form, title: e.target.value })} value={form?.title} id="outlined-basic" label="Title" variant="outlined" />

                    <TextField onChange={(e) => setForm({ ...form, body: e.target.value })} value={form?.body} sx={{ mt: 2 }} id="outlined-basic" label="Description" variant="outlined" />

                    <Box sx={{ mt: 4 }}>
                        <Button onClick={handleClose} sx={{ mr: 2 }} variant="outlined">Cancel</Button>
                        <Button onClick={handleEditPost} variant="contained">Update Post</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
