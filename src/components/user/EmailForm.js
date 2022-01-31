import React, { useState,useEffect } from "react";
import './css/Email.css';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Grid, Paper, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const EmailForm = () => {
  
  const paperStyle = {
    padding: 20,
    height: "470px",
    width: 500,
    margin: "20px auto",
  }


  return (
    <div>
      <Grid>
        <div id='email_content'>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar id="email_avatarStyle"><LockOutlinedIcon /></Avatar>
              <h2>이메일 인증</h2>
            </Grid><br />

            <Grid id="email_body" align="left">
              <div style={{marginTop: "5%"}}>
                <h4>이메일 인증</h4>
                <p> 이메일로 발송된 코드를 입력하세요.</p>
              </div>

              <Form.Group>
                <input
                id="input"
                type="email"
                name="email"
                placeholder="이메일을 입력하세요.."
                style={{marginBottom: "8%", marginTop: "3%"}}
                />
              </Form.Group>

              <div style={{ marginBottom: "8%" }}>
                <a> 이메일이 발송되기까지 시간이 다소 소요될 수 있습니다.</a>
                <p> 이메일이 오지 않았다면 <a href="#">재요청</a> 버튼을 눌러주세요.</p>
              </div>
            </Grid>

            <hr />
            <div style={{ float: "right"}} >
              <Button id="email_NoBgButton" >뒤로가기</Button> {/*추후 구현*/}
              <Link to="/signup"><Button id="email_NoBgButton" >완료</Button></Link>
            </div>
          </Paper>
        </div>
      </Grid>
    </div>
  )
}
export default EmailForm;