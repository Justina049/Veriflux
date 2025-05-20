import React from "react";
import "./Blog.scss";
import img from '../../Images/bl1.jpg'
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const blogPosts = [
  {
    id: 1,
    title: "How Blockchain is Changing Certificate Verification",
    excerpt: "Explore how decentralized systems bring trust, transparency, and efficiency to verifying academic and professional credentials.",
    date: "May 18, 2025",
    author: "Jane Jackson",
    image: {img}
  },
  {
    id: 2,
    title: "The Future of Digital Identity",
    excerpt: "Digital identity management is evolving. Here’s what it means for students, institutions, and employers.",
    date: "May 12, 2025",
    author: "John Samuel",
    image: {img}
  },

];

const Blog = () => {
  return (
    <div className="blog-section">
      <Navbar />
      <div className="blog-container">
        <h1 className="blog-title">Latest News & Insights</h1>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <div className="blog-card" key={post.id}>
              <img src={post.image} alt={post.title} className="blog-image" />
              <div className="blog-content">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
