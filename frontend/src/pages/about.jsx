import { Link } from "react-router-dom";

export function About() {
  return (
    <div>
      <h1>About Me</h1>
      <p>
        This blog is a simple project that I created to teach myself how to
        build a full-stack application using the MERN (MongoDB, Express, React,
        Node.js) stack. The blog allows users to create blogs, delete blogs,
        update blogs, and read blogs.
      </p>
      <p>
        This blog provides a space for users to share their thoughts,
        experiences, and expertise through blog posts.
      </p>
      <p>
        If you are interested in contributing, feel free to create a new blog by
        visiting <Link to="/create-blog">Create Blog</Link> page
      </p>
    </div>
  );
}
