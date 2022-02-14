import "./css/Blog.css";
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
                        <Col style={{marginLeft: "3%", marginTop: "1%"}}>
                            <div style={{marginBottom: "40%" }}>
                                {
                                    item.userPicture != null ?
                                    <img id="blogs_img2" src={item.userPicture} alt="" /> :
                                    <img id="blogs_img2" src='../image/Profileimage.png'/>
                                }
                                <strong id="blogs_userId">{item.userId}</strong>
                                <strong id="blogs_follow_button">팔로우</strong>
                            </div>
                            <div style={{marginBottom: "5%" }}>{
                                    item.liked == true ?
                                    <img src='../image/heart.png' id='blogs_heart'></img> :
                                    <img src='../image/empty_heart.png' id='blogs_heart'></img>
                                }
                                <strong id='blogs_heart_count'>{item.likeCount}</strong>
                            </div>
                        </Col>

                        <Col className='blogs_detail'>
                            <div style={{textAlign: "right", textAlignLast: "right",}}>
                                <strong id="blogs_cafeName" >{item.cafeName}</strong>
                                {
                                    item.marked == true ?
                                    <img id="blogs_bookmark" src='../image/bookmark.png'/> :
                                    <img id="blogs_bookmark" src='../image/empty_bookmark.png'/>
                                }
                            </div>
                        </Col>
                        
                        <Col style={{ height: "100%"}}>
                            <div id="blogs_info">
                                <img id="blogs_img3" src={item.file.filePath}/>
                            </div>
                        </Col>
                    </li>
                );
            })}
        </div>
    );
};

export default Blogs;
