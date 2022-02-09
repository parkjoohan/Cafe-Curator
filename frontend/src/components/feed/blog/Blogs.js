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
                    <li key={item.id} id="blogs_item">
                        <Col xs={7} md={9}>
                            <img id="blogs_img" src={item.userPicture} alt="" />
                            <strong style={{marginTop: "2%", marginLeft: "2%"}}>{item.userId}</strong>
                            <p style={{marginTop: "2%"}}>{item.content}</p>
                        </Col>
                        <Col xs={7} md={5} style={{height:"100%"}}>
                            <div id="blogs_info" style={{height:"100%"}}>
                                <img src={item.file.filePath} style={{width: "60%", height:"100%"}}/>
                                <div style={{border:"1px solid black"}}>ㅇㅇ</div>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default Blogs;