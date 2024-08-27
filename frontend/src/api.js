import axios from "axios";

const URL = "http://localhost:3000";
export async function getPosts() {
  // get all posts from the database
  const response = await axios.get(`${URL}/posts`);

  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// get a single post from the database
export async function getPost(id) {
  const response = await axios.get(`${URL}/posts/${id}`);

  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// create a new post in the database
export async function createPost(post) {
  const response = await axios.post(`${URL}/posts`, post);

  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// update a post in the database
export async function updatePost(id, post) {
  const response = await axios.put(`${URL}/posts/${id}`, post);

  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

// delete a post from the database
export async function deletePost(id) {
  const response = await axios.delete(`${URL}/posts/${id}`);

  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
