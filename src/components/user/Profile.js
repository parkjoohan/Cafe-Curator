import { buildQueries } from '@testing-library/react';
import React from 'react';
import  { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import './css/Profile.css'

const Profile = ({ show, onHide }) => {

  // //파일 미리볼 url을 저장해줄 state const 
  // [fileImage, setFileImage] = useState("");

  // // 파일 저장 
  // const saveFileImage = (e) => {
  //   setFileImage(URL.createObjectURL(e.target.files[0]));
  // };
  
  // // 파일 삭제 
  // const deleteFileImage = () => {
  //   URL.revokeObjectURL(fileImage); setFileImage("");
  // };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" dialogClassName="modal-w" centered>
      <Modal.Body id = "ModalPadding">
        <div id="profile_navcolor">
            <br></br>
        </div>
        <Container>
          <Row>
            {/* 이미지 경로 */}
            <Col>
              <img id='profile_image' src={process.env.PUBLIC_URL + "/image/Profileimage.png"}/>
              <input id='profile_upload_pic' type='file'/>
              <br></br>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer style={{ height: "50px", alignContent: "center" }}>
        <Button id="profile_NoBgExit" variant="secondary" onClick={onHide}>닫기</Button>
        <Button id="profile_NoBgButton" onClick={onHide}>등록하기</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Profile
