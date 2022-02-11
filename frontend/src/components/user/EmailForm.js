import React, { useState,useEffect } from "react";
import './css/Email.css';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { Link,Switch,Route } from 'react-router-dom';
import { Grid, Paper, Avatar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import SignupForm from "./SignupForm";

const EmailForm = () => {
  const [doorLock, setDoorLock] = useState(false)
  
  let history = useHistory();
  

  const paperStyle = {
    padding: 20,
    height: "510px",
    width: 500,
    margin: "20px auto",
  }

    // Email 보내는 부분
    const [email, setEmail] = useState(null);
  
    const onChangeEmail = e => {
      
      setEmail(e.target.value);
        
    }
    
    const onClickSend = async (e) => {
      e.preventDefault()
      try {
        //응답 성공 
        
        const response = await axios.post('http://i6c104.p.ssafy.io:8080/api/users/emailCheck',{
            //보내고자 하는 데이터 
            email : email
        });
        console.log(response);
        console.log(response.email)
      } catch (error) {
        //응답 실패
        console.error(error);
      }
    } 
  
    // 이메일 코드 인증하는 부분
    const [validate, setValidate] = useState(null);
  
    const onChangeCode = e => {
      
      setValidate(e.target.value);
        
    }
    
    const onClickCheck = async () => {
      try {
        //응답 성공
        console.log(email)
        console.log(validate) 
        const response = await axios.post('http://i6c104.p.ssafy.io:8080/api/users/verifyCode',{
            //보내고자 하는 데이터
            code : validate,
            email : email
        });
        
        // console.log(response.data);
        setDoorLock(response.data)
      } catch (error) {
        //응답 실패
        console.error(error);
      }
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

              <Container id='email_input'>
                <Row >
                  <Col>
                  <input id="input" type="email" onChange={onChangeEmail} name="email" placeholder="이메일을 입력하세요.." style={{ marginBottom: "3%" }} />
                  <Button onClick={onClickSend} id="email_validate_submit">전송</Button>
                  </Col>
                </Row>
                
                <Row>
                  <Col>
                    <input id="input" type="validate" onChange={onChangeCode} name="validate" placeholder="인증코드를 입력하세요.." style={{marginBottom: "8%", marginTop: "3%"}} />
                    <Button onClick={onClickCheck} id="email_validate_submit">확인</Button>
                  </Col>
                </Row>
                
              </Container>

              <div style={{ marginBottom: "8%" }}>
                <a> 이메일이 발송되기까지 시간이 다소 소요될 수 있습니다.</a>
                <p> 이메일이 오지 않았다면 <a href="#" onclick={() => onClickSend()}>재요청</a> 버튼을 눌러주세요.</p>
              </div>
            </Grid>

            <hr />
            <div style={{ float: "right"}} >
              <Button id="email_NoBgButton" onClick={ () => {
                history.goBack();
              }} >뒤로가기</Button> {/*추후 구현*/}
              {doorLock ?
              <Link to={`/signup/${email}`}><Button id="email_NoBgButton" >완료</Button></Link>
              : <Button id="email_NoBgButton" disabled>완료</Button>
              }
            </div>
          </Paper>
        </div>
      </Grid>
    </div>
  )

}
export default EmailForm;