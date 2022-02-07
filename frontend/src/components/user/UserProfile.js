import React , {useState} from "react";
import {Container, Col, Row} from 'react-bootstrap'
import './css/UserProfile.css';


export default function UserProfile() {
    
    // const[feed, setfeed] = useState(true)
    // const[follow, setfollow] = useState(false)

    // const SelectFeed = () => {
    //   alert('hi')
    //   document.getElementById('feed').style.backgroundColor = 'black'
    //   document.getElementById('feed').style.color = 'white'
    // }
    // const SelectFollow = () => {
    //   document.getElementById('follow').style.backgroundColor = 'black'
    //   document.getElementById('follow').style.color = 'white'
    // }
  
  return (
    <div>
      <Container id="userfile_Container">
        <Row>
          <Col sm={4}><img id ="userfile_ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}>
            <h2>커피나라 주한대사</h2>
            <a>게시물 42</a><a id="userfile_aMarginleft">팔로워 269</a><a id="userfile_aMarginleft">팔로우 242</a>
            <h5 id="userfile_explain"> 맛집킬러</h5>
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