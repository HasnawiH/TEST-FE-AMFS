import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Iconify from '../iconify';

export default function ListComment({ comments, handleClickDelete }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

      {comments && comments.map((comment, index) => {
        return (
          <ListItem key={index} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={comment?.name} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={`${comment?.body}`}
              secondary={
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box><Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment?.name}
                  </Typography>
                    {`- ${comment?.email}`}
                  </Box>
                  <Typography onClick={() => handleClickDelete(comment.id)} sx={{cursor: "pointer"}}>
                    <Iconify icon={'eva:trash-2-outline'} />
                  </Typography>
                </Box>
              }
            />

          </ListItem>
        )
      })}
    </List>
  );
}
