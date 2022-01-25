import React , {useState} from "react";
import {Container, Col, Row} from 'react-bootstrap'
import '../css/UserProfile.css';
import SignupForm from "./SignupForm";
import EmailForm from "./EmailForm";


export const UserProfile = () => {
    
    const [currentClick, setCurrentClick] = React.useState(0);
    const [ViewContent, setViewContent] = React.useState(true);

    const GetClick = (e) => {
      if (currentClick !== e){
      setCurrentClick(e);
      console.log(e);
      }
    };
  
    
    React.useEffect(
        () => {
          if (currentClick === 0) {
            let current = document.getElementById('btnplus');
            let previous = document.getElementById('case2');
            console.log(current);
            current.style.color = "white";
            current.style.backgroundColor = "#484848";
            previous.style.color = "black";
            previous.style.backgroundColor = "white";
            // ViewContent = 'true'
          }

          else if (currentClick === 1) {
            let current = document.getElementById('case2');
            let previous = document.getElementById('btnplus');
            console.log(current);
            current.style.color = "white";
            current.style.backgroundColor = '#484848';
            previous.style.color = "black";
            previous.style.backgroundColor = "white";
            // ViewContent = 'false'
            
          }
        },
        [currentClick]
        
      );
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
      <Container id="ProfileContainer">
        <Row>
          <Col sm={4}><img id ="ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}>
            <h2>커피나라 주한대사</h2>
            <a>게시물 42</a><a id="aMarginleft">팔로워 269</a><a id="aMarginleft">팔로우 242</a>
            <h5 id="pMarginTop"> 맛집킬러</h5>
          </Col>
        </Row>
        
      </Container>
      <hr id="HrStyle"></hr>
      <div id="ButtonDiv" class="btn-group" role="group" aria-label="Basic example">
        <button onClick={() => {GetClick(0);setViewContent(true)}} type="button" id="btnplus" class="btn" >
          
          <i class="fas fa-anchor fa-sm pr-2"
            aria-hidden="true"></i> Feed</button>
        <button onClick={() => {GetClick(1);setViewContent(false)}} type="button" id="case2" class="btn"><i class="fas fa-user-secret fa-sm pr-2"
            aria-hidden="true"></i> Bookmark</button>
      </div>
      {/* <Container id="ContainerWidth">
        <Row>
          <Col id="ProfileCol" sm={6}><Button id="ProfileButtonLeft">One</Button></Col>
          <Col id="ProfileCol" sm={6}><Button id="ProfileButton">Two</Button></Col>
        </Row>
      </Container> */}
      <div>
        { ViewContent ? "하이" : "이하이" }
        {/* 여기에 이제 컴포넌트 집어넣을거임! */}
      </div>
      <Container>
        <Row>
          <Col sm={4}><img name="FeedImage" id ="FeedImage" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}><img name="FeedImage" id ="FeedImage" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}><img name="FeedImage" id ="FeedImage" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
        </Row>
      </Container>
    </div>
  )
 } 


export default UserProfile;
