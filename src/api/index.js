import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    'Content-type': 'application/json',
  }
});

/** POST */
export const fetchPosts = () => API.get(`/users/1/posts`);
export const createPost = (formData) => API.post(`/posts`, formData);
export const updatePost = (formData) => API.put(`/posts/${formData?.id}`, formData);
export const deletePost = (id) => API.delete(`/posts/${id}`);

/** USER */
export const fetchUsers = () => API.get(`/users`);

/** COMMENT */
export const fetchComment = (id) => API.get(`/posts/${id}/comments`);
export const createComment = (id, comment) => API.post(`/posts/${id}/comments`, comment);
export const deleteComment = (id) => API.delete(`/posts/${id}/comments`);