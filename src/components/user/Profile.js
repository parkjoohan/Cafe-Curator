import { buildQueries } from '@testing-library/react';
import React from 'react';
import  { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import './css/Profile.css'

const Profile = ( { show, onHide}) => {
  return (
    <Modal
      show = {show}
      onHide = {onHide}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="modal-w"
      centered
    >
      
       
      
      <Modal.Body id = "ModalPadding">
        <div id="navcolor">
            <br></br>
          
        </div>
        <div>
          <br></br>
          
        <Container>
          <Row>
            {/* 이미지 경로 */}
            {/* <Col><img src={ require('../static/hello.png') } id="ProfilePic" /></Col> */}
            <Col>
            <br></br>
            <input
            className="input"
            type="email"
            name="email"
            placeholder="파일명"
            />
          <br></br>
          <a href="#">선택</a>          
          </Col>
          
          </Row>
          <br></br>
        </Container>


        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button id="NoBgExit" variant="secondary" onClick={onHide}>닫기</Button>
        <Button id="NoBgButton" onClick={onHide}>등록하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Profile
