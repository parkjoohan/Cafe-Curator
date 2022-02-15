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
                        <Col style={{marginLeft: "3%", marginTop: "2%"}}>
                            <div style={{marginBottom: "35%" }}>
                                {
                                    item.userPicture != null ?
                                    <img id="bookmarks_img2" src={item.userPicture} alt="" /> :
                                    <img id="bookmarks_img2" src='../image/Profileimage.png'/>
                                }
                                <strong id="bookmarks_userId">{item.userId}</strong>
                                <strong id="bookmarks_follow_button">팔로우</strong>
                            </div>
                            <div style={{marginBottom: "5%" }}>{
                                    item.liked == true ?
                                    <img src='../image/heart.png' id='bookmarks_heart'></img> :
                                    <img src='../image/empty_heart.png' id='bookmarks_heart'></img>
                                }
                                <strong id='blogs_heart_count'>{item.likeCount}</strong>
                            </div>
                        </Col>

                        <Col className='bookmarks_detail'>
                            <div id='bookmarks_detail_form'>
                                <strong id="bookmarks_cafeName" >{item.cafeName}</strong>
                                {
                                    item.marked == true ?
                                    <img id="bookmarks_bookmark" src='../image/bookmark.png'/> :
                                    <img id="bookmarks_bookmark" src='../image/empty_bookmark.png'/>
                                }
                            </div>
                        </Col>

                        <Col style={{ width: "50px", height: "100%" }}>
                            <div style={{width: "100%", height: "100%", paddingTop: "3%", paddingBottom: "3%"}}>
                                <img id="bookmarks_img3" src={item.file.filePath}/>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default BookMarks;