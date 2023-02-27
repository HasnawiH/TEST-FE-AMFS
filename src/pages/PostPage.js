import { useState, useEffect } from 'react';
import { Grid, Button, Container, Stack, Typography } from '@mui/material';

// components
import Iconify from '../components/iconify';
import { PostCard, PostsSearch } from '../sections/@dashboard/post';
import ModalNewPost from '../components/modal/modalNewPost';
import ModalEditPost from '../components/modal/modalEditPost';
import ModalDetailPost from '../components/modal/modalDetailPost';

import { fetchPosts } from '../api';

export default function PostPage() {

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(!openModal);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const handleOpenModalDetail = () => setOpenModalDetail(!openModalDetail);

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const handleOpenModalEdit = () => setOpenModalEdit(!openModalEdit);

  const [dataDetail, setDataDetail] = useState(null)
  const [listPosts, setListPost] = useState([]);

  /** fetching api */
  const handleFetchPosts = async () => {
    try {
      const response = await fetchPosts()

      if (response?.status === 200) {
        setListPost(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleFetchPosts()
  }, []);

  return (
    <>
      {openModal && <ModalNewPost open={openModal} handleClose={handleOpenModal} setNewPost={(value) => setListPost([value, ...listPosts])} />}

      {openModalEdit
        && <ModalEditPost
          open={openModalEdit}
          handleClose={handleOpenModalEdit}
          setEditPost={(value) => {

            // Manipulation filter data for set value update data
            const filterPost = listPosts.filter((post) => post.id !== dataDetail.id)
            setListPost([value, ...filterPost])
          }}
          data={dataDetail}
        />
      }

      {openModalDetail
        && <ModalDetailPost
          open={openModalDetail}
          handleClose={handleOpenModalDetail}
          setNewPost={() => {

            // Manipulation filter data for delete
            const filterPost = listPosts.filter((post) => post.id !== dataDetail.id)
            setListPost([...filterPost])

          }}
          data={dataDetail}
          handleClickEdit={
            () => {
              handleOpenModalEdit()
              handleOpenModalDetail()
            }
          }
        />
      }

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            List Posts
          </Typography>
          <Button onClick={handleOpenModal} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <PostsSearch posts={listPosts} />
        </Stack>

        <Grid container spacing={3}>
          {listPosts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              index={index}
              handleClick={() => {
                setDataDetail(post)
                handleOpenModalDetail()
              }}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
}
