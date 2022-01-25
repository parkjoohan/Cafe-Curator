import React, { useState,useEffect } from "react";
import './css/SignupForm.css';
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import EmailModal from './EmailModal';
import { blue } from '@material-ui/core/colors';

export default function SignupForm () {

  const [ProfilemodalShow, ProfilesetModalShow] = React.useState(false);
  const [EmailmodalShow, EmailsetModalShow] = React.useState(false);

  const paperStyle = {
    padding: 20,
    height: "950px",
    width: 500,
    margin: "20px auto",
  }

  const avatarStyle = {
    background: "#1bbd7e",
  }

  const btnStyle = {
    margin: "8px, "
  }

  const oauthimage = {
    margin: '10px',
    width: '400px',
  }

  const Profileimage = {
    marginLeft: 155,
    marginBottom: 40,
    border: 1
  }

  let emailbutton = {
    fontSize: 12,
    width: 95,
    marginTop: 5,
    color: blue,
  }

  return (
    <div>
      <Grid>
        <div className='content'>
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
            <TextField label="Email" placeholder='Enter email' fullWidth required /><br />
            <Button className='emailbutton' variant="primary" onClick={() => EmailsetModalShow(true)}>
            이메일인증
            </Button>
            <EmailModal
              show={EmailmodalShow}
              onHide={() => EmailsetModalShow(false)}
            />
            <TextField label="Password" placeholder='Enter password' type="password" fullWidth required/><br /><br/>
            <TextField label="Re-Password" placeholder='Enter password' type="password" fullWidth required/><br /><br/>
            <TextField label="Username" placeholder='Enter username' type="password" fullWidth required/>
            <FormControlLabel
              control={
                <Checkbox
                  name="checkedB"
                  color='primary'
                />
                }
                label="약관동의"
            />
            <Link className="link"  to="/TermsModal">
                약관 확인
            </Link><br /><br />
            <Button type="submit" color="primary" variant='contained' style={btnStyle} fullWidth>Sign Up</Button><br /><br/>

            <div className="divider">
              <hr className="line" />
              <p className="sociallogin">소셜 회원가입</p>
              <hr className="line" />
            </div>

            <div className="oauthlist">
              <img className="oauthimage" src={process.env.PUBLIC_URL + "/image/kakaooauthimage.png"}/>
            </div>

            <hr />

            <div className="d-grid gap-2">
              <Link className="link"  to="/login"><Button type="submit" color="light" variant='contained' size="lg" fullWidth>
                로그인하러 가기
              </Button></Link>
            </div>
          </Paper>
        </div>
      </Grid>
    </div>
  )
}