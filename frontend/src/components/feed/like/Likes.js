import "./css/Like.css";
import React from "react";
import Like from "./Like";
import  { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';

const Likes = props => {

    return (
        <div>
            {props.isLoading
                ? new Array(10).fill(1).map((_, i) => {
                    return <Like key={i} />;
            })
            : props.data.map(item => {
                return (
                    <li key={item.id} id="likes_item">
                        <Col style={{marginLeft: "3%", marginTop: "1%"}}>
                            <div style={{marginBottom: "40%" }}>
                                {
                                    item.userPicture != null ?
                                    <img id="likes_img2" src={item.userPicture} alt="" /> :
                                    <img id="likes_img2" src='../image/Profileimage.png'/>
                                }
                                <strong id="likes_userId">{item.userId}</strong>
                                <strong id="likes_follow_button">팔로우</strong>
                            </div>
                            <div style={{marginBottom: "5%" }}>{
                                    item.liked == true ?
                                    <img src='../image/heart.png' id='likes_heart'></img> :
                                    <img src='../image/empty_heart.png' id='likes_heart'></img>
                                }
                                <strong id='likes_heart_count'>{item.likeCount}</strong>
                            </div>
                        </Col>

                        <Col className='likes_detail'>
                            <div id='likes_detail_form'>
                                <strong id="likes_cafeName" >{item.cafeName}</strong>
                                {
                                    item.marked == true ?
                                    <img id="likes_bookmark" src='../image/bookmark.png'/> :
                                    <img id="likes_bookmark" src='../image/empty_bookmark.png'/>
                                }
                            </div>
                        </Col>

                        <Col style={{ width: "80px", height: "100%" }}>
                            <div style={{width: "300px", height: "265px", paddingTop: "3%", paddingBottom: "3%"}}>
                                <img id="likes_img3" src={item.file.filePath} />
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default Likes;