import React , {useState} from "react";
import {Container, Col, Row} from 'react-bootstrap'
import './StoreProfile.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CakeIcon from '@mui/icons-material/Cake';
import CameraIcon from '@mui/icons-material/Camera';
// 모달부분
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export const UserProfile = () => {
  const [currentClick, setCurrentClick] = React.useState(0);
  const [ViewContent, setViewContent] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const GetClick = (e) => {
    if (currentClick !== e){
    setCurrentClick(e);
    console.log(e);
    }
  };
  
  const modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
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
      {/* <div id="divback">
      <Container id="ProfileContainer">
        <Row >
          <Col sm={4} style={{marginTop : "2%", backgroundColor : "white"}}>
            <p> [전화이모티콘] 02-332-5325</p>
            <p>[지도 이모티콘] 서울 마포구 연남로 59-1</p>
            <a id="aMarginleft">가좌역 1번 출구에서 662m</a>
          </Col>
          <Col sm={4} style={{marginTop : "1%"}}> <h2>세상에서 가장 달콤한 시간</h2>  </Col>
          <Col sm={4} style={{marginTop : "1.8%"}}>
            [라벨명] [라벨명]
          </Col>
        </Row>
        <br></br>
        <br></br>
      </Container>
      </div>
      
      <Container>
        <Row>
          <Col sm={3}><img name="FeedImage" id ="FeedImage" src={process.env.PUBLIC_URL + "/image/hello.png"}></img>
          <p style= {{marginLeft: "50%"}}>앙뇽쿠키</p></Col>
          <Col sm={3}><img name="FeedImage" id ="FeedImage" src={process.env.PUBLIC_URL + "/image/naveroauthimage.png"}></img>
          <p style= {{marginLeft: "50%"}}>네이버쿠키</p>
          </Col>
          <Col sm={3}><img name="FeedImage" id ="FeedImage" src={process.env.PUBLIC_URL + "/image/map.png"}></img>
          <p style= {{marginLeft: "50%"}}>지도쿠키</p>
          </Col>
          <Col sm={3}><img name="FeedImage" id ="FeedImage" src={process.env.PUBLIC_URL + "/image/java.png"}></img>
          <p style= {{marginLeft: "50%"}}>쿠키잡아</p>
          </Col>
        </Row>
      </Container> */}
      
      <Container id="storeprofile_Container">
        <Row>
          <Col sm={5}><img id ="storeprofile_ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}>
            <a style={{fontSize : "2rem"}}>caffemidwork</a><button>팔로우하기</button>
            <br></br>
            <a>게시물 42</a><a id="storeprofile_aMarginleft">팔로워 269</a><a id="storeprofile_aMarginleft">팔로우 242</a>
            <br></br>
            <Button style={{color: "blue" }}onClick={handleOpen}>메뉴보기</Button>
            <h5 id="storeprofile_pMarginTop"> 맛집킬러</h5>
          </Col>
          <Col sm={3}>
            {/* 라벨부 */}
            <Stack direction="row" spacing={1}>
              <Chip icon={<CakeIcon />} label="너무 맛있는집" color="error" />
              <Chip icon={<CameraIcon />} label="인스타 사진 맛집" color="warning" />
            </Stack>
          </Col>
        </Row>
        
      </Container>
      <hr id="storeprofile_HrStyle"></hr>
      <div id="storeprofile_ButtonDiv" class="btn-group" role="group" aria-label="Basic example">
        <button onClick={() => {GetClick(0);setViewContent(true)}} type="button" id="btnplus" class="btn" >
          
          <i class="fas fa-anchor fa-sm pr-2"
            aria-hidden="true"></i> 게시물</button>
        <button onClick={() => {GetClick(1);setViewContent(false)}} type="button" id="case2" class="btn"><i class="fas fa-user-secret fa-sm pr-2"
            aria-hidden="true"></i> 메뉴</button>
      </div>
      <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="storeprofile_modalbox" sx={modalstyle}>
          <div id="storeprofile_modalbackground">
            <br></br>
              <Container>
                <Row style={{width: "83%", marginLeft: "15%"}}>
                  <Col sm={7}><h2 style={{marginLeft: "40%"}}>바나나 컴퍼니</h2></Col>
                  <Col style={{marginTop: "1%"}} sm={5}><Chip style= {{marginLeft: "10%"}}icon={<CakeIcon />} label="너무 맛있는집" color="error" /></Col>
                </Row>
                
              </Container>
            <div style={{marginLeft : "5%", backgroundColor : "white", width: "30%"}}>
              {/* 여기에 이제 카페정보들이 들어갈거에요 */}
              <p> 02-1546-4151</p>
              <p> 서울시 싸피구 1등하조로 18길</p>
              <p> 영업중</p>
            </div>
            <br></br>
          </div>
          <Typography style={{textAlign : "center"}}id="modal-modal-title" variant="h6" component="h2">
            대표메뉴
          </Typography>
          <Typography style={{textAlign : "center"}} id="modal-modal-description" sx={{ mt: 2 }}>
            여기에 메뉴사진들이 들어갈꺼에요
          </Typography>
        </Box>
      </Modal>
    </div>
    </div>
  )
 } 


export default UserProfile;
