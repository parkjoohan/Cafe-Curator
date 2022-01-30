import "./css/BlogPrint.css";
import React from "react";
import Blog from "./Blog";
import  { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';

const Blogs = props => {
    return (
        <div>
            {props.isLoading
                ? new Array(10).fill(1).map((_, i) => {
                    return <Blog key={i} />;
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

export default Blogs;