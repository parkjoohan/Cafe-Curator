import { buildQueries } from '@testing-library/react';
import React from 'react';
import  { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import './css/Profile.css'

const Profile = ({ show, onHide }) => {
  const [ProfilemodalShow, ProfilesetModalShow] = React.useState(false);
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-w" centered>
      <Modal.Body id = "ModalPadding">
        <div className="navcolor">
            <br></br>
        </div>
        <Container>
          <Row>
            {/* 이미지 경로 */}
            <Col>
            <img className='profile_image' src={process.env.PUBLIC_URL + "/image/Profileimage.png"} onClick={() => ProfilesetModalShow(true)}/>
            <input className="input" type="email" name="email" placeholder="파일명"/>
            <br></br>
            <a href="#">선택</a>          
          </Col>
          
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button id="NoBgExit" variant="secondary" onClick={onHide}>닫기</Button>
        <Button id="NoBgButton" onClick={onHide}>등록하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Profile
