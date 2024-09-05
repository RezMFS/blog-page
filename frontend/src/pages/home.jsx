import { getPosts } from "../api";
import { useState, useEffect } from "react";
import { BlogCard } from "../component/blog-card";

export function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadAllPosts() {
      const data = await getPosts();
      data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      setPosts(data);
    }
    loadAllPosts();
  }, []);

  return (
    <div className="posts">
      {posts.map((post) => {
        return <BlogCard key={post._id} post={post} />;
      })}
    </div>
  );
}
