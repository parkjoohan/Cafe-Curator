import React, { useEffect, useState,useRef } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import axios from 'axios';
import './css/UserProfile.css';
import UserProfileFeed from "./UserProfileFeed";
import Userprofilefollowerlist from "./Userprofilefollowerlist";
import Userprofilefollowlist from "./Userprofilefollowlist";


export default function UserProfile(props) {
    
  const profilefeedRef = useRef();
  const followerRef = useRef();
  const followRef = useRef();
  const [userId, setUserId] = useState([])
  const [user, setUser] = useState([]);
  const [data, setData] = useState({});
  let {id} = useParams();
  const [isfollow,setIsfollow] = useState(false)
  const [followercnt, setFollowercnt] = useState(0);
  const [followermodalshow, setFollowermodalshow] = useState(false);
  const [followmodalshow, setFollowmodalshow] = useState(false);
    
  // 계정 정보 불러오기
  useEffect(() => {
    props.setFootershow(false);
    axios.get(`http://i6c104.p.ssafy.io:8080/api/users/account/${id}`)
      .then((data2) => {
        console.log(data2.data);
        setData(data2.data);
        const checkfollowurl = `http://i6c104.p.ssafy.io:8080/checkFollow/${props.user[1]}/${data2.data.userNo}`
        axios.get(checkfollowurl).then(res=>{
          setIsfollow(res.data)
          console.log(res.data)
        })
        if(followerRef.current){
          followerRef.current.setDetaildata([data2.data.userNo,props.user[1]])
        }
        if(followRef.current){
          followRef.current.setDetaildata([data2.data.userNo,props.user[1]])
        }
      })
    return (()=>{
      props.setFootershow(true)
    })
  }, []);

  useEffect(()=>{
    setFollowercnt(data.followerCount);
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

  const follow = (userNo) => {
    const followurl = `http://i6c104.p.ssafy.io:8080/follow/${props.user[1]}/${userNo}`
    console.log(followurl)
    axios.get(followurl).then(res=>
      {
        console.log(res.data)
        if(isfollow==true){
          setIsfollow(false);
          setFollowercnt(prev=>prev-1)
        }else{
          setIsfollow(true);
          setFollowercnt(prev=>prev+1)
        }
      }
    )
  }
  
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
            <div style={{display:"flex"}}>
              <h2>{data.userId}</h2>
              {
                (props.user[0] != data.userId && isfollow==false ) &&
                <p onClick={()=>follow(data.userNo)}>팔로우</p>
              }
              {
                (props.user[0] != data.userId && isfollow==true ) &&
                <p onClick={()=>follow(data.userNo)}>팔로우중</p>
              }
            </div>
            <a>게시물 {data.feedCount}</a>
            <a id="userfile_aMarginleft" onClick={()=>{setFollowermodalshow(true)}}>팔로워 {followercnt}</a>
            <a id="userfile_aMarginleft" onClick={()=>{setFollowmodalshow(true)}}>팔로우 {data.followingCount}</a>
            <h5 id="userfile_explain">{data.introduction}</h5>
          </Col>
        </Row>

      <hr id="userfile_HrStyle"></hr>
        <UserProfileFeed  ref={profilefeedRef}/>
      </Container>
      <Userprofilefollowerlist show={followermodalshow} onHide={()=>{setFollowermodalshow(false)}} ref={followerRef}/>
      <Userprofilefollowlist show={followmodalshow} onHide={()=>{setFollowmodalshow(false)}} ref={followRef}/>
    </div>
  )
 } 