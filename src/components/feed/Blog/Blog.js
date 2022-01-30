import './css/Blog.css';
import React from 'react';

const Blog = () => {
    return (
        <li className="blog-item">
            <div>
                <div className="blog-img" />
            </div>
            <div className="blog-info">
                <p className="blog-name" />
                <p className="blog-email" />
            </div>
        </li>
    );
};

export default Blog;