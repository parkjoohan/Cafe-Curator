import React, {useState} from 'react';
import  { Modal, Button, Col, Row } from 'react-bootstrap';
import './css/LikeCategory.css'

const LikeCategoryModal = ({ show, onHide }) => {
  
  const [like,setlike] = useState([
    [0,false],
    [1,false],
    [2,false],
    [3,false],
  ])

  let likename = ['관심사1','관심사2','관심사3','관심사4'];

  const selectlike = (n) => {
    const newlike = [...like];
    newlike[n][1] = true;
    setlike(newlike);
  }

  const unlike = (n) => {
    const newlike = [...like];
    newlike[n][1] = false;
    setlike(newlike);
  }

  const defaultlike = like.map((num)=>(
    <>
      {num[1]==false?
        <Col lg={3} md={5} xs={10}>
          <div 
          className='likebutton' 
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
        <Col xs={2}>
          <div 
          className='selected' 
          id={num[0]}
          onClick={()=>unlike(num[0])}
          >{likename[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  return (
    <Modal
      show={show}
      size="lg"
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-w"
      centered
    >
      <Modal.Body className="ModalPadding">
        <div className="navcolor"></div>
        <Row>
          <Col xs={6} md={6}>
            <h3 className="LikeCategory_Margin_Underline">관심사를 선택해주세요</h3>
          </Col>
          <Col xs={6} md={4}>
            <h6 className='LikeCategory_If'>※ 조건 : 최소 1개 ~ 최대 3개</h6>
          </Col>
          <Col xs={6} md={2}>
          </Col>
        </Row>
        
        {/* 선택된 카테고리 */}선택된 카테고리
        <hr />

        {/* 분위기 카테고리 */}분위기 카테고리<br /><br /><br />

        {/* 메뉴 카테고리 */}메뉴 카테고리<br /><br /><br />
        
      </Modal.Body>
      <Modal.Footer style={{ height: "50px", alignContent: "center" }}>
      <Button className="NoBgButton" onClick={onHide}>뒤로가기</Button> {/*추후 구현*/}
      <Button className="NoBgButton" onClick={onHide}>완료</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default LikeCategoryModal
