import React, {useState,useEffect, useImperativeHandle, forwardRef} from 'react';
import  { Modal, Button, Col, Row } from 'react-bootstrap';
import './css/LikeCategory.css'

const LikeCategoryModal = forwardRef(({ show, onHide,likearr, setLikearr },ref) => {
  const [defaultDetail, setdefaultDetail] = useState([])
  useImperativeHandle(ref,()=>(
    {setdefaultDetail,}
  ))
  useEffect(()=>{
    let newlikearr = [...like]
    for (let i = 0; i < likename.length; i++) {
      if(defaultDetail.includes(likename[i])){
        newlikearr[i] = [i,true];
      }
    }
    let newlikearr2 = [...like2]
    for (let i = 0; i < likename2.length; i++) {
      if(defaultDetail.includes(likename2[i])){
        newlikearr2[i] = [i,true];
      }
    }
    setlike(newlikearr);
    setlike2(newlikearr2)
    setCnt(defaultDetail.length);
  },[defaultDetail])
  const [cnt,setCnt] = useState(0);
  
  const [like,setlike] = useState([
    [0,false],
    [1,false],
    [2,false],
    [3,false],
    [4,false],
  ])

  let likename = ['커피','케이크','마카롱/쿠키','브런치','차'];

  useEffect(()=>{
    // console.log(likearr)
  },[likearr])

  const selectlike = (n) => {
    if(cnt==3){
      alert('관심사는 최대 3개까지 선택 가능합니다.')
    }else{
    const newlike = [...like];
    newlike[n][1] = true;
    setlike(newlike);
    setCnt(prev=>prev+1);
    }
  }
  

  const unlike = (n) => {
    const newlike = [...like];
    newlike[n][1] = false;
    setlike(newlike);
    setCnt(prev=>prev-1);
  }

  const defaultlike = like.map((num)=>(
    <>
      {num[1]==false?
        <Col lg={5} md={5} xs={10}>
          <div 
          className='likecate_likebutton' 
          id={num[0]}
          onClick={()=>selectlike(num[0])}
          >{likename[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  const selected = like.map((num)=>(
    <>
      {num[1]==true?
        <Col lg={3} xs={2}>
          <div 
          className='likecate_likebutton' 
          id={num[0]}
          onClick={()=>unlike(num[0])}
          >{likename[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  // 여기까지는 메뉴관심사코드
  const [like2,setlike2] = useState([
    [0,false],
    [1,false],
    [2,false],
    [3,false],
    [4,false],
  ])

  let likename2 = ['사진찍기 좋은','아늑한','힙한','공부하기 좋은', '테마있는'];

  const selectlike2 = (n) => {
    if(cnt==3){
      alert('관심사는 최대 3개까지 선택 가능합니다.')
    }else{
    const newlike = [...like2];
    newlike[n][1] = true;
    setlike2(newlike);
    setCnt(prev=>prev+1);
    }
  }

  const unlike2 = (n) => {
    const newlike = [...like2];
    newlike[n][1] = false;
    setlike2(newlike);
    setCnt(prev=>prev-1);
  }

  const defaultlike2 = like2.map((num)=>(
    <>
      {num[1]==false?
        <Col lg={5} md={5} xs={10}>
          <div 
          className='likecate_likebutton' 
          id={num[0]}
          onClick={()=>selectlike2(num[0])}
          >{likename2[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  const selected2 = like2.map((num)=>(
    <>
      {num[1]==true?
        <Col lg={3} xs={2}>
          <div 
          className='likecate_likebutton' 
          id={num[0]}
          onClick={()=>unlike2(num[0])}
          >{likename2[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  useEffect(()=>{
    let newlikearr = []
    for (let i = 0; i < like.length; i++) {
      if(like[i][1]==true){
        newlikearr.push(likename[i]);
      }
      if(like2[i][1]==true){
        newlikearr.push(likename2[i])
      }
    }
    setLikearr(newlikearr)
  },[like,like2])

  return (
    <Modal
      show={show}
      size="lg"
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-w"
      centered
    >
      <div id="navcolor_cate"></div>
      <Modal.Header>
          <Col md={8}>
            <h3 id="LikeCategory_Margin_Underline">관심사를 선택해주세요</h3>
          </Col>
          <Col md={8}>
            <h6 id='LikeCategory_If'>※ 조건 : 최소 1개 ~ 최대 3개</h6>
          </Col>
      </Modal.Header>
      
      <Modal.Body>  
        <div id='LikeCategory_cate'>
          <div id='LikeCategory_cate_air_menu'>
            {/* 선택된 카테고리 */}
              <p id='LikeCategory_cate_air_menu_selected'>선택된 카테고리</p>
              <Row style={{justifyContent: "left", width:"200%", marginLeft: "-12%"}}>{selected}{selected2}</Row>
          </div>

          <hr />

          <div id='LikeCategory_cate_air'>
            {/* 분위기 카테고리 */}
            <h5 id='LikeCategory_cate_air_menu_p'>분위기 카테고리</h5>
            <Row style={{justifyContent: "left", width:"60%"}}>{defaultlike2}</Row>
          </div>
          
          <hr />

          <div id='LikeCategory_cate_menu'>
            {/* 메뉴 카테고리 */}
            <h5 id='LikeCategory_cate_air_menu_p'>메뉴 카테고리</h5>
            <Row style={{justifyContent: "left", width:"60%"}}>{defaultlike}</Row>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ height: "50px", alignContent: "center" }}>
      <Button id="NoBgButton" onClick={onHide}>뒤로가기</Button> {/*추후 구현*/}
      <Button id="NoBgButton" onClick={onHide}>완료</Button>
      </Modal.Footer>
    </Modal>
  )
})

export default LikeCategoryModal
