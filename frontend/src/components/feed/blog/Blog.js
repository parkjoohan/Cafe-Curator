import './css/BlogPrint.css';
import React from 'react';

const Blog = () => {
    return (
        <li id="blog_item">
            <div>
                <div id="blog_img" />
            </div>
            <div id="blog_info">
                <p id="blog_name" />
                <p id="blog_email" />
            </div>
        </li>
    );
};

export default Blog;