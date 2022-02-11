import "./css/BookMark.css";
import React from "react";
import BookMark from "./BookMark";
import  { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';

const BookMarks = props => {
    return (
        <div>
            {props.isLoading
                ? new Array(10).fill(1).map((_, i) => {
                    return <BookMark key={i} />;
            })
            : props.data.map(item => {
                return (
                    <li key={item.id} id="bookmarks_item">
                        <Col xs={7} md={3} style={{ height: "100%" }}>
                            <div id="bookmarks_info">
                                <img id="bookmarks_img2" src={item.file.filePath} style={{width: "60%", height:"100%"}}/>
                            </div>
                        </Col>
                        <Col xs={7} md={9} style={{marginLeft: "5%", marginTop: "1%"}}>
                            <div style={{marginBottom: "3%"}}>
                                {
                                    item.userPicture != null ?
                                    <img id="bookmarks_img2" src={item.userPicture} alt="" /> :
                                    <img id="bookmarks_img2" src='../image/Profileimage.png'/>
                                }
                                <strong id="bookmarks_userId">{item.userId}</strong>
                            </div>
                            <div style={{marginBottom: "3%"}}>
                                <Row id='item_categoryList_form'>
                                    <div id='item_categoryList'><p>{ item.categoryList[0] }</p></div>
                                    <div id='item_categoryList'><p>{ item.categoryList[1] }</p></div>
                                </Row>
                            </div>
                            <div>
                                <img src='../image/heart.png' style={{ width: "30px" }}></img>
                                <strong style={{marginLeft: "2%"}}>{item.likeCount}</strong>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default BookMarks;