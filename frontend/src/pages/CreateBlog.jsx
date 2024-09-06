import { useState } from "react";
import { createPost } from "../api";
import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";
import { Label } from "@/component/ui/label";

export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
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
      <Label className="flex left-0 p-2">Blog Post Title :</Label>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        maxLength={50}
        required
        name="title"
      ></Input>
      <Label className="flex left-0 p-2">Blog Post Description :</Label>
      <Input
        onChange={(e) => setDescription(e.target.value)}
        maxLength={100}
        required
        name="description"
      ></Input>
      <Label className="flex left-0 p-2">Blog Post Content :</Label>
      <Input
        onChange={(e) => setContent(e.target.value)}
        maxLength={1000}
        required
        name="content"
      ></Input>
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
}
