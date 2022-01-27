import React from "react";
import { Link, useHistory } from 'react-router-dom'
import {Navbar,Nav,Col} from "react-bootstrap";
import './css/Header.css'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
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

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <Navbar className='nav' expand="sm" bg="light">
      <Col className='left' xs={5}>
        <Nav className="me-auto">
          <Nav.Link><Link to="/" className="link">Home</Link></Nav.Link>
          <Nav.Link><Link to="/feed" className="link">Map & Feed</Link></Nav.Link>
          <Nav.Link><Link to="/feed2" className="link">BookMark & Like</Link></Nav.Link>
          <Nav.Link><Link to="/bookmark" className="link">Search</Link></Nav.Link>
        </Nav>
      </Col>
      <Col className='center' xs={3} >
        <Navbar.Brand className='link_img'>
          <Link to="/" className="link_img">Cafe Curator </Link>
        </Navbar.Brand>
      </Col>
      <Col  xs={4}>
        <Nav className='right'>
          <Nav.Link><Link to="/login" className="link">Login</Link></Nav.Link>
          <Nav.Link><Link to="/signup" className="link">Signup</Link></Nav.Link>
          <div className="profile">

            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <img className="prof_img" style={{width: "40px"}}
            src={process.env.PUBLIC_URL + "/image/hello.png"}
            />
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={()=>{history.push('/profile/0')}}>Profile</MenuItem>
              <MenuItem onClick={profileModal}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
           <Modal
            open={profileopen}
            onClose={modalHandleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
            <Box sx={{ ...style, width: 500, padding: 0 }}>
              
              <div style={{backgroundColor : "#4b6b79"}}>
                <br />
                <br />
              </div>
              <p id="parent-modal-description">
              <Box
                style={{marginLeft: "5%",marginTop : "5%"}}
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '18ch' },
                }}
                noValidate
                autoComplete="off"
                size="small"
              >
                
                <h1>회원 정보 수정</h1>
                <hr style={{width: '40ch'}}/>
                <Grid style={{width: "100%"}}container spacing={2}>
                  <Grid style={{padding : '0'}}item xs={6}>
                <a>변경할 이름</a>
                <br />
                <TextField
                  id="outlined-name"
                  label="Name"
                  
                 
                />
                <br />
                <a>변경할 비밀번호</a>
                <br />
                <TextField
                  id="outlined-uncontrolled"
                  label="Password"
                  // defaultValue="pw"

                />
                <br />
                <a>비밀번호 재확인</a>
                <br />
                <TextField
                  id="outlined-uncontrolled"
                  label="PasswordConfirm"
                  // defaultValue="pw"

                />
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{textAlign: "center" }}>회원사진</p>
                    <br />
                    <img id ="ImgPreview" src={process.env.PUBLIC_URL + "/image/map.png"}></img>
                    <br />
                    <Button style={{marginLeft: "75px"}}>변경하기</Button>
                  </Grid>
                </Grid>
                <br />
                <Button style={{width: "120px"}}size="small" variant="outlined">관심사 선택</Button>
                <br />
                <Button style={{padding: 0,margin: 0 ,width: "120px", color: "#484848", fontSize: "23px"}}>뒤로가기</Button>
                <Button style={{padding: 0,margin: 0 ,width: "120px", marginLeft : "215px" ,color: "#1E4DF6", fontSize: "23px"}}>적용하기</Button>
              </Box>
              </p>
              {/* <ChildModal /> */}
            </Box>
           </Modal>
          </div>
        </Nav>
      </Col >
    </Navbar>
  );
}
export default Header;