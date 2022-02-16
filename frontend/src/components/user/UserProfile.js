import React, { useEffect, useState,useRef } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios';
import './css/UserProfile.css';
import UserProfileFeed from "./UserProfileFeed";


export default function UserProfile(props) {
    
  const profilefeedRef = useRef();
  const [userId, setUserId] = useState([])
  const [user, setUser] = useState([]);
  const [data, setData] = useState({});
  let {id} = useParams();
    
  // 계정 정보 불러오기
  useEffect(() => {
    props.setFootershow(false);
    axios.get(`http://i6c104.p.ssafy.io:8080/api/users/account/${id}`)
      .then((data2) => {
        console.log(data2.data);
        setData(data2.data);
      })
    return (()=>{
      props.setFootershow(true)
    })
  }, []);

  useEffect(()=>{
    if(data.userNo){
      if(profilefeedRef.current){
        profilefeedRef.current.setYoume([data.userNo,props.user[1]])
      }
    }
  },[data])

  //피드 불러오기

  // useEffect(()=>{

  //   console.log(data,'data변경!!',data.userNo)
  //   console.log(props.user)
  //   if(data.userNo){
  //     let url = `http://i6c104.p.ssafy.io:8080/feed/feedList/${data.userNo}`
  //     if(props.user[1]!==null){
  //       url += `/${props.user[1]}`
  //     }
  //     axios.get(url)
  //   }

  // },[data])

  
  return (
    <div>
      <Container id="userfile_Container">
        <Row>
          {/* 프로필 사진 */}
          <Col id="userfile_ImgPreview_frame" sm={4}>
            {
              data.picture != null ?
              <img id="userfile_ImgPreview" src={data.picture} /> :
              <img id="userfile_ImgPreview" src='../image/Profileimage.png'/>
            }
            {/* <img id="userfile_ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img> */}
          </Col>
          {/* 개인 프로필 정보 */}
          <Col id='userfile_content' sm={4}>
            <h2>{data.userId}</h2>
            <a>게시물 {data.feedCount}</a><a id="userfile_aMarginleft">팔로워 {data.followerCount}</a><a id="userfile_aMarginleft">팔로우 {data.followingCount}</a>
            <h5 id="userfile_explain">{data.introduction}</h5>
          </Col>
        </Row>

      <hr id="userfile_HrStyle"></hr>
        <UserProfileFeed ref={profilefeedRef}/>
      </Container>
    </div>
  )
 } 