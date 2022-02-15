import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios';
import './css/UserProfile.css';


export default function UserProfile() {
    
  const [userId, setUserId] = useState([])
  const [user, setUser] = useState([]);
  const [data, setData] = useState({});
  let {id} = useParams();
    
  // 계정 정보 불러오기
  useEffect(() => {
    axios.get(`http://i6c104.p.ssafy.io:8080/api/users/account/${id}`)
      .then((data2) => {
        console.log(data2.data);
        setData(data2.data);
      })
  }, []);

  //피드 불러오기
  useEffect(() => {
    console.log(data.userNo);
    axios.get(`http://localhost:8080/feed/feedList/${data.userNo}/${localStorage.getItem('userNo')}`, {
      params: {
        "size":5,
        "type":"feed",
        "lastFeedNo": null,
      }
    }).then(function(res){
      console.log(res.data);
    })
  })

  
  return (
    <div>
      <Container id="userfile_Container">
        <Row>
          {/* 프로필 사진 */}
          <Col sm={4}>
            {
              data.picture != null ?
              <img id="userfile_ImgPreview" src={data.picture} /> :
              <img id="userfile_ImgPreview" src='../image/Profileimage.png'/>
            }
            {/* <img id="userfile_ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img> */}
          </Col>
          {/* 개인 프로필 정보 */}
          <Col sm={4}>
            <h2>{data.userId}</h2>
            <a>게시물 {data.feedCount}</a><a id="userfile_aMarginleft">팔로워 {data.followerCount}</a><a id="userfile_aMarginleft">팔로우 {data.followingCount}</a>
            <h5 id="userfile_explain">{data.introduction}</h5>
          </Col>
        </Row>

      <hr id="userfile_HrStyle"></hr>

        <Row>
          <Col sm={4}><img name="FeedImage" id ="userfile_FeedImage" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}><img name="FeedImage" id ="userfile_FeedImage" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}><img name="FeedImage" id ="userfile_FeedImage" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
        </Row>
      </Container>
    </div>
  )
 } 