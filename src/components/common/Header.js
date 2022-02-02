import React from "react";
import { Link, useHistory } from 'react-router-dom'
import {Navbar,Nav,Col,Row, NavDropdown, Button, Container} from "react-bootstrap";
import './css/Header.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const history = useHistory();

  const [profileopen, profilesetOpen] = React.useState(false);

  // 모달부분
  const profileModal = () => {
    profilesetOpen(true);

  };
  const modalHandleClose = () => {
    profilesetOpen(false);

  };

  const gotoProfile = () => {
    setAnchorEl(null);
    history.push('/profile/0')
  }
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0.1px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

  return (
    <Navbar id='header_nav' expand="sm" bg="light">
      <Col id='header_left' xs={5}>
        <Nav className="me-auto">
          <Nav.Link><Link to="/" id="header_link">Home</Link></Nav.Link>
          <Nav.Link><Link to="/feed" id="header_link">Map & Feed</Link></Nav.Link>
          <Nav.Link><Link to="/feed2" id="header_link">BookMark & Like</Link></Nav.Link>
          <Nav.Link><Link to="/feed3" id="header_link">Search</Link></Nav.Link>
        </Nav>
      </Col>
      <Col id='header_center' xs={3} >
        <Navbar.Brand id='header_link_img'>
          <Link to="/" id="header_link_img">Cafe Curator </Link>
        </Navbar.Brand>
      </Col>
      <Col  xs={4}>
        <Nav id='header_right'>
          <Nav.Link><Link to="/login" id="header_link">Login</Link></Nav.Link>
          <Nav.Link><Link to="/email" id="header_link">Signup</Link></Nav.Link>
          <div id="header_profile">
          <NavDropdown align="end" title={<img id="header_prof_img" style={{width: "40px"}}
            src={process.env.PUBLIC_URL + "/image/hello.png"}
            />} id="dropdown-menu-align-end">
            <NavDropdown.Item onClick={gotoProfile}>Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={profileModal}>My account</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Logout</NavDropdown.Item>
          </NavDropdown>
            <Modal open={profileopen} onClose={modalHandleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
              <Box sx={{ ...style, width: 600, padding: 0 }}>
                <div id="navcolor"></div>
                
                <p id="parent-modal-description">
                  <Container id='fix_profile_con' >
                    <h1 id='modal_title'>회원 정보 수정</h1>
                    
                      <Grid id="fix_profile_center" container>
                      <Grid id="fix_profile_left" item xs={8}>
                        <Row>
                          <a>변경할 이름</a>
                          <input id='fix_info' placeholder="Name" />
                        </Row>
                        <Row>
                          <a>변경할 비밀번호</a>
                          <input id="fix_info" placeholder="Password" />
                        </Row>
                        <Row>
                          <a>비밀번호 재확인</a>
                          <input id="fix_info" placeholder="PasswordConfirm" />
                        </Row>
                        </Grid>
              
                      <Grid id="fix_profile_right" item xs={4}>
                        <Row>
                          <img id ="fix_profile_pic" src={process.env.PUBLIC_URL + "/image/map.png"}></img>
                          <Button id='fix_profile_select_pic' variant="outline-light">변경하기</Button> 
                        </Row>
                      </Grid>
                      
                    </Grid>
                  </Container>
                  <hr id='fix_profile_hr'/>
                  <div>
                    <Row xs={5} md={5}>
                      <Button id='fix_profile_cate' variant="outline-light">관심사선택</Button>
                      <Button id='fix_profile_delete' variant="outline-light">회원탈퇴</Button>
                      </Row>
                      
                      <Row xs={5} md={5}>
                        <Button id='fix_profile_goback' variant="outline-light">뒤로가기</Button>
                        <Button id='fix_profile_apply' variant="outline-light">적용하기</Button>
                      </Row>
                  </div>
                </p>
              </Box>
            </Modal>
          </div>
        </Nav>
      </Col >
    </Navbar>
  );
}
export default Header;