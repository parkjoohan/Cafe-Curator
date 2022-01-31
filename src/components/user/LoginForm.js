import React, { useState,useEffect } from "react";
import './css/LoginForm.css';
import {Modal, Form} from 'react-bootstrap'
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';

function temp_pw_issuance() {
	let ranValue1 = ['1','2','3','4','5','6','7','8','9','0'];
	let ranValue2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	let ranValue3 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	let ranValue4 = ['!','@','#','$','%','^','&','*','(',')'];
	
	var temp_pw = "";
	
	for(let i=0 ; i<2; i++) {
		let ranPick1 = Math.floor(Math.random() * ranValue1.length);
		let ranPick2 = Math.floor(Math.random() * ranValue2.length);
		let ranPick3 = Math.floor(Math.random() * ranValue3.length);
		let ranPick4 = Math.floor(Math.random() * ranValue4.length);
		temp_pw = temp_pw + ranValue1[ranPick1] + ranValue2[ranPick2] + ranValue3[ranPick3] + ranValue4[ranPick4];
	}

  return temp_pw
}

export default function LoginForm() {

  const paperStyle = {
    padding: 20,
    height: "600px",
    width: 500,
    margin: "20px auto",
  }

  const avatarStyle = {
    background: "#1bbd7e",
  }

  const btnStyle = {
    margin: "8px, "
  }
  
  const [show, setShow] = useState(false);
  const [emailforfind, setEmailforfind] = useState("")  
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false)
  };
  const handleCloseandSend = async() => {
    await handleClose();
    let pw = temp_pw_issuance();
    alert(`\"${emailforfind}\"로 임시 비밀번호가 발급됐습니다.\n메일함을 확인해주세요.\n서버의 상황에 따라 수신이 지연될 수 있습니다. \n임시비밀번호는 ${pw}입니다.`)
  }

  return (
    <div>
      <Grid>
        <div className='content'>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <h2>Login</h2>
            </Grid><br />
            <TextField label="Email" placeholder='Enter email' fullWidth required/><br /><br/>
            <TextField label="Password" placeholder='Enter password' type="password" fullWidth required/>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color='primary'
                />
                }
                label="아이디 기억하기"
            /><br /><br/>
            <Button type="submit" color="primary" variant='contained' style={btnStyle} fullWidth>Login In</Button><br /><br/>

            <div className="divider">
              <hr className="line" />
              <p className="sociallogin">소셜 로그인</p>
              <hr className="line" />
            </div>

            <div className="oauthlist">
              <img className="oauthimage" src={process.env.PUBLIC_URL + "/image/kakaooauthimage.png"}/>
              {/* <img className="oauthimage" src={process.env.PUBLIC_URL + "/image/naveroauthimage.png"}/> */}
            </div>

            <hr />

            <Typography> 회원가입하기 &nbsp;
              <Link className="link"  to="/signup">
                Sign Up
              </Link>
            </Typography>
            <Typography> 비밀번호가 생각나지 않으세요? &nbsp;
              <Link className="link" onClick={handleShow}>
                임시비밀번호 발송
              </Link>
            </Typography><br/>
          </Paper>
        </div>
      </Grid>

      <Modal show={show} onHide={handleClose} className="Modal">
      <Modal.Header className="Modalhead" closeButton >
      </Modal.Header>
      <Modal.Body>
        <p className="passwordchangemessage">입력한 주소로 임시 비밀번호를 보냅니다.</p>
        <Form.Control
          className="input"
          placeholder="가입시 입력한 이메일 주소"
          type="email"
          name="email"
          id="email"
          onChange={(e)=>{setEmailforfind(e.target.value)}}
        />
        <p className="passwordchangemessage">
          서버 상황에 따라 5분정도 늦어질 수 있습니다.
          <br/>
          임시 비밀번호를 발급받고 꼭 비밀번호를 바꿔주세요!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseandSend}>
          임시 비밀번호 발급
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}