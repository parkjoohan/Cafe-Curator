import React , {useEffect, useState, useRef} from "react";
import { useParams,useLocation,useHistory } from "react-router-dom";
import {Container, Col, Row} from 'react-bootstrap'
import './StoreProfile.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CakeIcon from '@mui/icons-material/Cake';
import CameraIcon from '@mui/icons-material/Camera';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CottageIcon from '@mui/icons-material/Cottage';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import CookieIcon from '@mui/icons-material/Cookie';
import { pink, brown, lime, yellow, deepPurple, lightBlue,grey,teal } from '@mui/material/colors';
// 모달부분
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import StoreProfilefeed from "./StorePrifilefeed";
import Storemodal from "./Storemodal";

export const StoreProfile = (props) => {
  const history = useHistory();
  let id = useParams();
  const location = useLocation();
  const cafename = location.state.name
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const feedRef = useRef();
  const [detail,setDetail] = useState([0,[]]);

  useEffect(()=>{
    props.setFootershow(false)
    // console.log(id)
    if(feedRef.current){
      feedRef.current.setCafeid(Number(id.pk));
    }
    return (()=>{
      props.setFootershow(true)
    })
  },[])

  const gotoCategorysearch = e => {
    let category = e.target.innerHTML.substring(0,e.target.innerHTML.length - 2)
    // console.log(category)
    history.push(`/categorysearch/${category}`)
  }
    
  return (
    <div>
      <Container id="storeprofile_Container">
        <Row>
          <Col sm={5}><img id ="storeprofile_ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img></Col>
          <Col sm={4}>
            <p style={{fontSize : "2rem"}}>{cafename}</p>
            <p>게시물 {detail[0]}</p>
            <br></br>
            <Button style={{color: "blue" }}onClick={handleOpen}>메뉴보기</Button>

            <Stack direction="row" spacing={1} id="chipbox">
              {
                detail[1].map((category)=>{
                  if (category=="케이크"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<CakeIcon />} label="케이크 맛집" style={{backgroundColor:`${pink[100]}`}} />
                    )
                  } else if (category=="커피"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<CoffeeIcon />} label="커피 맛집" style={{backgroundColor:`${brown[100]}`}} />
                    )
                  } else if (category=="마카롱/쿠키"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<CookieIcon />} label="마카롱/쿠키 맛집" style={{backgroundColor:`${brown[200]}`}} />
                    )
                  } else if (category=="브런치"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<BrunchDiningIcon />} label="브런치 맛집" style={{backgroundColor:`${yellow[100]}`}} />
                    )
                  } else if (category=="차"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<FreeBreakfastIcon />} label="차 맛집" style={{backgroundColor:`${lime[100]}`}} />
                    )
                  } else if (category=="사진찍기 좋은"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<CameraIcon />} label="사진찍기 좋은 장소" style={{backgroundColor:`${lightBlue[100]}`}} />
                    )
                  } else if (category=="아늑한"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<CottageIcon />} label="아늑한 장소" style={{backgroundColor:`${brown[300]}`}} />
                    )
                  } else if (category=="힙한"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<NightlifeIcon />} label="힙한 장소" style={{backgroundColor:`${deepPurple[200]}`}} />
                    )
                  } else if (category=="공부하기 좋은"){
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<MenuBookIcon />} label="공부하기 좋은 장소" style={{backgroundColor:`${grey[400]}`}} />
                    )
                  } else {
                    return (
                      <Chip onClick={(e)=>gotoCategorysearch(e)} icon={<BedroomBabyIcon />} label="테마있는 장소" style={{backgroundColor:`${teal[400]}`}} />
                    )
                  }
                })
              }
            </Stack>
          </Col>
        </Row>
      </Container>
      <hr id="storeprofile_HrStyle"></hr>
      <StoreProfilefeed ref={feedRef} user={props.user} setDetail={setDetail}/>
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