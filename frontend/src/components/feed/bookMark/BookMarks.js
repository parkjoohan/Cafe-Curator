import "./css/BookMarkPrint.css";
import React from "react";
import BookMark from "./BookMark";
import  { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';

const BookMarks = props => {
    return (
        <div>
            <h1>북마크</h1>
            {props.isLoading
                ? new Array(10).fill(1).map((_, i) => {
                    return <BookMark key={i} />;
            })
            : props.data.map(item => {
                return (
                    <li key={item.id} id="bookmark_item">
                        <Col xs={7} md={9}>
                            <img id="bookmark_img" src={item.userPicture} alt="" />
                            <strong style={{marginTop: "2%", marginLeft: "2%"}}>{item.userId}</strong>
                            <p style={{marginTop: "2%"}}>{item.content}</p>
                        </Col>
                        <Col xs={7} md={5} style={{height:"100%"}}>
                            <div id="bookmark_info" style={{height:"100%"}}>
                                <img src={item.file.filePath} style={{width: "60%", height:"100%"}}/>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default BookMarks;