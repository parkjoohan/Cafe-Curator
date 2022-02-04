import './css/BookMark.css';
import React from 'react';

const BookMark = () => {
    return (
        <li id="bookmark-item">
            <div>
                <div id="bookmark-img" />
            </div>
            <div id="bookmark-info">
                <p id="bookmark-name" />
                <p id="bookmark-email" />
            </div>
        </li>
    );
};

export default BookMark;