import "./css/LikePrint.css";
import React from "react";
import Like from "./Like";
import  { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';

const Likes = props => {
    return (
        <div>
            <h1>좋아요 리스트</h1>
            {props.isLoading
                ? new Array(10).fill(1).map((_, i) => {
                    return <Like key={i} />;
            })
            : props.data.map(item => {
                return (
                    <li key={item.id} className="item">
                        <Col xs={7} md={9}>
                            <img className="img" src={item.avatar} alt="" />
                            <strong style={{marginTop: "2%", marginLeft: "2%"}}>{item.first_name} {item.last_name}</strong>
                            <p style={{marginTop: "2%"}}>{item.email}</p>
                        </Col>
                        <Col xs={7} md={5}>
                            <div className="info">
                                <img src='image/coffeecong.jpg' style={{width: "60%"}}/>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default Likes;