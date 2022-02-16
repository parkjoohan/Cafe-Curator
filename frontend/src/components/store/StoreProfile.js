import React , {useEffect, useState, useRef} from "react";
import { useParams,useLocation } from "react-router-dom";
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
import StoreProfilefeed from "./StorePrifilefeed";
import Storemodal from "./Storemodal";

export const StoreProfile = (props) => {
  let id = useParams();
  const location = useLocation();
  const cafename = location.state.name
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const feedRef = useRef();

  useEffect(()=>{
    props.setFootershow(false)
    console.log(id)
    if(feedRef.current){
      feedRef.current.setCafeid(Number(id.pk));
    }
    return (()=>{
      props.setFootershow(true)
    })
  },[])

  // const GetClick = (e) => {
  //   if (currentClick !== e){
  //   setCurrentClick(e);
  //   console.log(e);
  //   }
  // };
  
  // const modalstyle = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 800,
  //   bgcolor: 'background.paper',
  //   boxShadow: 24,
  //   p: 4,
  // };
  
  // React.useEffect(
  //     () => {
  //       if (currentClick === 0) {
  //         let current = document.getElementById('btnplus');
  //         let previous = document.getElementById('case2');
  //         console.log(current);
  //         current.style.color = "white";
  //         current.style.backgroundColor = "#484848";
  //         previous.style.color = "black";
  //         previous.style.backgroundColor = "white";
  //         // ViewContent = 'true'
  //       }

  //       else if (currentClick === 1) {
  //         let current = document.getElementById('case2');
  //         let previous = document.getElementById('btnplus');
  //         console.log(current);
  //         current.style.color = "white";
  //         current.style.backgroundColor = '#484848';
  //         previous.style.color = "black";
  //         previous.style.backgroundColor = "white";
  //         // ViewContent = 'false'
          
  //       }
  //     },
  //     [currentClick]
      
  //   );
    
  return (
    <div>
      <Container id="storeprofile_Container">
        <Row>
          <Col sm={5}><img id ="storeprofile_ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}>
            <p style={{fontSize : "2rem"}}>{cafename}</p>
            <p>게시물 42</p>
            <br></br>
            <Button style={{color: "blue" }}onClick={handleOpen}>메뉴보기</Button>

            <Stack direction="row" spacing={1}>
              <Chip icon={<CakeIcon />} label="너무 맛있는집" color="error" />
              <Chip icon={<CameraIcon />} label="인스타 사진 맛집" color="warning" />
            </Stack>
          </Col>
        </Row>
      </Container>
      <hr id="storeprofile_HrStyle"></hr>
      <StoreProfilefeed ref={feedRef} user={props.user}/>
      <Storemodal open={open} onClose={handleClose} id={id.id}/>
    </div>
  )
 } 


export default StoreProfile;


{/* <hr id="storeprofile_HrStyle"></hr>
<div id="storeprofile_ButtonDiv" class="btn-group" role="group" aria-label="Basic example">
  <button onClick={() => {GetClick(0);setViewContent(true)}} type="button" id="btnplus" class="btn" >
    
    <i class="fas fa-anchor fa-sm pr-2"
      aria-hidden="true"></i> 게시물</button>
  <button onClick={() => {GetClick(1);setViewContent(false)}} type="button" id="case2" class="btn"><i class="fas fa-user-secret fa-sm pr-2"
      aria-hidden="true"></i> 메뉴</button>
</div> */}
// <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box id="storeprofile_modalbox" sx={modalstyle}>
//           <div id="storeprofile_modalbackground">
//             <br></br>
//               <Container>
//                 <Row style={{width: "83%", marginLeft: "15%"}}>
//                   <Col sm={7}><h2 style={{marginLeft: "40%"}}>바나나 컴퍼니</h2></Col>
//                   <Col style={{marginTop: "1%"}} sm={5}><Chip style= {{marginLeft: "10%"}}icon={<CakeIcon />} label="너무 맛있는집" color="error" /></Col>
//                 </Row>
                
//               </Container>
//             <div style={{marginLeft : "5%", backgroundColor : "white", width: "30%"}}>
//               {/* 여기에 이제 카페정보들이 들어갈거에요 */}
//               <p> 02-1546-4151</p>
//               <p> 서울시 싸피구 1등하조로 18길</p>
//               <p> 영업중</p>
//             </div>
//             <br></br>
//           </div>
//           <Typography style={{textAlign : "center"}}id="modal-modal-title" variant="h6" component="h2">
//             대표메뉴
//           </Typography>
//           <Typography style={{textAlign : "center"}} id="modal-modal-description" sx={{ mt: 2 }}>
//             여기에 메뉴사진들이 들어갈꺼에요
//           </Typography>
//         </Box>
//       </Modal>