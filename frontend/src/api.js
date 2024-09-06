import axios from "axios";

const URL = "http://localhost:3000";

// Posts API
export async function getPosts() {
  // get all posts from the database
  const response = await axios.get(`${URL}/posts`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

// get a single post from the database
export async function getPost(id) {
  const response = await axios.get(`${URL}/posts/${id}`);
  const post = response.data;
  return post;
}

// create a new post in the database
export async function createPost(post) {
  const response = await axios.post(`${URL}/posts`, post);

  return response;
}

// update a post in the database
export async function updatePost(id, post) {
  const response = await axios.put(`${URL}/posts/${id}`, post);

  return response;
}

// delete a post from the database
export async function deletePost(id) {
  const response = await axios.delete(`${URL}/posts/${id}`);

  return response;
}

// ====================================================

// Users API
export async function getUser(id) {
  const response = await axios.get(`${URL}/users/${id}`);

  if (response.status === 200) {
    return response.data;
  } else {
    return;
  }
}

// create a new users in the database
export async function createUser(user) {
  const response = await axios.post(`${URL}/users`, user);
  return response;
}

// update a users in the database
export async function updateUser(id, user) {
  const response = await axios.put(`${URL}/users/${id}`, user);
  return response;
}

// verify user
export async function verifyUser(user) {
  const response = await axios.post(`${URL}/users/login`, user);
  if (response.data.success) {
    return response.data.token;
  } else {
    return;
  }
}
