import React, { useState,useEffect } from "react";
import './css/SignupForm.css';
import {Col, Row} from 'react-bootstrap'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import EmailModal from './EmailModal';
import TermsModal from './TermsModal';
import LikeCategoryModal from './LikeCategoryModal';

export default function SignupForm () {

  const [ProfilemodalShow, ProfilesetModalShow] = React.useState(false);
  const [EmailmodalShow, EmailsetModalShow] = React.useState(false);
  const [TermsmodalShow, TermssetModalShow] = React.useState(false);
  const [LikeCategorymodalShow, LikeCategoryModalShow] = React.useState(false);

  const paperStyle = {
    padding: 20,
    height: "930px",
    width: 500,
    margin: "20px auto",
  }

  const avatarStyle = {
    background: "#1bbd7e",
  }

  const btnStyle = {
    margin: "8px, "
  }

  const Profileimage = {
    marginLeft: 155,
    marginBottom: 40,
    border: 1
  }

  return (
    <div>
      <Grid>
        <div id='signup_content'>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <h2>Sign Up</h2>
            </Grid><br />
            <img style={Profileimage} src={process.env.PUBLIC_URL + "/image/Profileimage.png"} id="ProfilePic" onClick={() => ProfilesetModalShow(true)}/>
            <Profile
              show={ProfilemodalShow}
              onHide={() => ProfilesetModalShow(false)}
            />

            {/* 이메일 */}
            <TextField label="Email" placeholder='Enter email' fullWidth required />
            <Button id='emailbutton' variant="primary" onClick={() => EmailsetModalShow(true)}>
            이메일인증
            </Button>
            <EmailModal show={EmailmodalShow} onHide={() => EmailsetModalShow(false)}/>

            {/* 비밀번호 & 아이디 */}
            <div id="singup_content">
            <TextField  label="Password" placeholder='Enter password' type="password" fullWidth required/>
            </div>
            <div id="singup_content">
            <TextField label="Re-Password" placeholder='Enter password' type="password" fullWidth required />
            </div>

            <TextField label="Username" placeholder='Enter username' type="password" fullWidth required />
            
            <div style={{marginTop: "3%", marginBottom: "5%"}}>
              <Row>
                <Col sm={6}>
                  {/* 관심사선택 */}
                  <Button id="signup_cate" variant="secondary" size="sm" onClick={() => LikeCategoryModalShow(true)}>
                    관심사 선택
                  </Button>
                  <LikeCategoryModal show={LikeCategorymodalShow} onHide={() => LikeCategoryModalShow(false)}/>
                </Col>

                <Col sm={6}>
                  {/* 약관동의 */}
                  <FormControlLabel control={ <Checkbox name="checkedB" color='primary'/> } label="약관동의"/>
                  <Button id="signup_link" variant="primary" onClick={() => TermssetModalShow(true)}>
                      약관 확인
                  </Button>
                  <TermsModal show={TermsmodalShow} onHide={() => TermssetModalShow(false)}/>
                </Col>
              </Row>
            </div>

            {/* 회원가입 버튼 */}
            <Button type="submit" color="primary" variant='contained' style={btnStyle} fullWidth>Sign Up</Button><br /><br/>

            {/* 소셜 회원가입 */}
            <div id="divider">
              <hr id="line" />
              <p id="sociallogin">소셜 회원가입</p>
              <hr id="line" />
            </div>

            <div id="signup_oauthlist">
              <img id="signup_oauthimage" src={process.env.PUBLIC_URL + "/image/kakaooauthimage.png"}/>
            </div>

            <hr />

            {/* 로그인 하러가기 버튼 */}
            <div className="d-grid gap-2">
              <Link className="link" to="/login"><Button type="submit" color="light" variant='contained' size="lg" fullWidth>
                로그인하러 가기
              </Button></Link>
            </div>
          </Paper>
        </div>
      </Grid>
    </div>
  )
}