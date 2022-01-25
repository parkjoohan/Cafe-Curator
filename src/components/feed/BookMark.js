import './css/BookMark.css';
import React from 'react';

const BookMark = () => {
    return (
        <li className="bookmark-item">
            <div>
                <div className="bookmark-img" />
            </div>
            <div className="bookmark-info">
                <p className="bookmark-name" />
                <p className="bookmark-email" />
            </div>
        </li>
    );
};

export default BookMark;