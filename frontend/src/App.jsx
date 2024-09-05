import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./pages/about";
import { CreateBlog } from "./pages/create-blog";
import { Home } from "./pages/home";
import { Landing } from "./pages/landing";
import { Profile } from "./pages/profile";
import { ReadBlog } from "./pages/read-blog";
import { Navbar } from "./component/navbar";
import { Layout } from "./component/layout";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    let token = sessionStorage.getItem("User");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  });

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/read-blog/:id" element={<ReadBlog />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
