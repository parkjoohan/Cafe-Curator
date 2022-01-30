import './css/Like.css';
import React from 'react';

const Like = () => {
    return (
        <li className="like-item">
            <div>
                <div className="like-img" />
            </div>
            <div className="like-info">
                <p className="like-name" />
                <p className="like-email" />
            </div>
        </li>
    );
};

export default Like;