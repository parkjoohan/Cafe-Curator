import './css/BookMarkPrint.css';
import React from 'react';

const BookMark = () => {
    return (
        <li id="bookmark_item">
            <div>
                <div id="bookmark_img" />
            </div>
            <div id="bookmark_info">
                <p id="bookmark_name" />
                <p id="bookmark_email" />
            </div>
        </li>
    );
};

export default BookMark;