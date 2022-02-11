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
                        <Col xs={7} md={5} style={{marginLeft: "3%", marginTop: "1%"}}>
                            <div style={{marginBottom: "3%" }}>
                                {
                                    item.userPicture != null ?
                                    <img id="likes_img2" src={item.userPicture} alt="" /> :
                                    <img id="likes_img2" src='../image/Profileimage.png'/>
                                }
                                <strong id="likes_userId">{item.userId}</strong>
                                <strong id="likes_follow_button">팔로우</strong>
                            </div>
                            <div id='likes_content_form'>
                                <div><p id='likes_content'>{ item.content }</p></div>
                            </div>
                            <div>{
                                    item.liked == true ?
                                    <img src='../image/heart.png' style={{ width: "30px" }}></img> :
                                    <img src='../image/empty_heart.png' style={{ width: "30px" }}></img>
                                }
                                <strong style={{ marginLeft: "2%" }}>{item.likeCount}</strong>
                                <strong style={{ marginLeft: "5%" }}>댓글</strong>
                                {/* <strong style={{ marginLeft: "2%" }}>{item.comment_count}</strong>  댓글 수도 받아올 수 있게 만들어야함 */}
                            </div>
                        </Col>
                        <Col xs={7} md={3} className='likes_detail'>
                            <div style={{textAlign: "right"}}>
                                <strong id="likes_cafeName" >{item.cafeName}(링크)</strong>
                                {
                                    item.marked == true ?
                                    <img id="likes_img2" style={{width: "35px", height: "35px"}} src='../image/bookmark.png'/> :
                                    <img id="likes_img2" style={{width: "35px", height: "35px"}} src='../image/empty_bookmark.png'/>
                                }
                            </div>
                        </Col>
                        <Col xs={7} md={3} style={{ height: "100%" }}>
                            <div id="likes_info">
                                <img id="likes_img2" src={item.file.filePath} style={{width: "60%", height:"100%"}}/>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default Likes;