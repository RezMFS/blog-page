/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { deletePost } from "@/api";
import { useState } from "react";

export function BlogCard({ post }) {
  const [isDeleting, setIsDeleting] = useState(false);

  let date = new Date(post.dateCreated);
  let stringDate = date.toString();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await deletePost(post._id);
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the post", error);
      alert("Failed to delete the post. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Card className="flex w-full justify-center my-8 hover:bg-muted">
      <Link to={`/readblog/${post._id}`} className="w-full">
        <CardHeader>
          <CardTitle>
            <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-primary">
              {post.title}
            </h1>
          </CardTitle>
          <CardDescription>
            <h2>{post.description}</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3>{stringDate.slice(4, 15)}</h3>
        </CardContent>
      </Link>
      <Button
        type="submit"
        className="mt-4"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </Card>
  );
}
