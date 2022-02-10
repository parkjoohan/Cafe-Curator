import './css/Like.css';
import React from 'react';

const Like = () => {
    return (
        <li id="like_item">
            <div>
                <div id="like_img" />
            </div>
            <div id="like_info">
                <p id="like_name" />
                <p id="like_email" />
            </div>
        </li>
    );
};

export default Like;