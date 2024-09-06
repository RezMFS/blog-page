import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="w-1/3">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">
        About Me
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">
        This blog is a simple project that I created to teach myself how to
        build a full-stack application using the MERN (MongoDB, Express, React,
        Node.js) stack. The blog allows users to create blogs, delete blogs,
        update blogs, and read blogs.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">
        This blog provides a space for users to share their thoughts,
        experiences, and expertise through blog posts.
      </p>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">
        If you are interested in contributing, feel free to create a new blog by
        visiting <Link to="/CreateBlog">Create Blog</Link> page
      </p>
    </div>
  );
}
