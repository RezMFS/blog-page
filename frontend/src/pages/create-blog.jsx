import { useState } from "react";
import { createPost } from "../api";

export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    // Function for submitting the form into the database.
    let submitObject = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
    };

    await createPost(submitObject);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Blog Post Title :</label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
        required
        name="title"
      ></input>
      <label>Blog Post Description :</label>
      <input
        onChange={(e) => setDescription(e.target.value)}
        maxLength={100}
        required
        name="description"
      ></input>
      <label>Blog Post Content :</label>
      <input
        onChange={(e) => setContent(e.target.value)}
        maxLength={1000}
        required
        name="content"
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}
