import React, { useState,useEffect } from "react";
import './css/SignupForm.css';
import {Col, Row} from 'react-bootstrap'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useParams} from 'react-router-dom';
import Profile from './Profile';
import EmailModal from './EmailModal';
import TermsModal from './TermsModal';
import LikeCategoryModal from './LikeCategoryModal';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignupForm (props) {
  let history = useHistory();
  const [ProfilemodalShow, ProfilesetModalShow] = React.useState(false);
  const [EmailmodalShow, EmailsetModalShow] = React.useState(false);
  const [TermsmodalShow, TermssetModalShow] = React.useState(false);
  const [LikeCategorymodalShow, LikeCategoryModalShow] = React.useState(false);
  const [likearr, setLikearr] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  // 회원가입 정보부분
    // 이메일 받아오기
  // const location = useLocation()
  // const email = location.state.email
  // console.log(email)
  const [form, setForm] = useState({
    id: '',
    password: '',
    repassword:''
  })

  // id paswword repassword값 받기!
  const onChangeId = e => {  
  let newform = {...form}
  newform.id = e.target.value
  setForm(newform)
  }
  const onChangePw = e => {  
    let newform = {...form}
  newform.password = e.target.value
  setForm(newform)
  }
  const onChangeRePw = e => {  
    let newform = {...form}
  newform.repassword = e.target.value
  setForm(newform)
  }

  const [email,setEmail] = useState("");

  const emailparams = useParams();

  useEffect(()=>{
    setEmail(emailparams)
  },[])
  
  
  const signup = async () => {
    const response = await axios.get(`http://i6c104.p.ssafy.io:8080/api/users/checkUserId/${form.id}`, {
      //보내고자 하는 데이터 
      userId: form.id
    });
    if (response.data === true) {
      let signupForm = new FormData();
      {
        signupForm.append("userDetailDto", new Blob([JSON.stringify({
          pass: form.password,
          userId: form.id,
          categoryList: likearr
        })], { type: "application/json" })
        )
      }
      signupForm.append("userDto", new Blob([JSON.stringify(email)], { type: "application/json" }))
      signupForm.append("multipartFile", file);
      const signupurl = "http://i6c104.p.ssafy.io:8080/api/users/"
      axios({
        method: "post",
        url: signupurl,
        data: signupForm,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(function (res) {
        console.log(res.data)
        if (res.data = "success")
      
          history.push("/login");
      })
    }else{alert('same id has been discovered')}
  }
  // 회원가입 성공-> 이전페이지로 돌아가서 -> 로그인페이지로 다시 가짐.
  // 로그인 성공하면? 이전페이지로, 결국 회원가입하고 이전페이지로 가질수있음

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
          <Paper elevation={10} id='signup_paperStyle'>
            <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
              <h2>Sign Up</h2>
            </Grid><br />
            {!fileUrl ?
            <div>
              <img src={process.env.PUBLIC_URL + "/image/Profileimage.png"} id="signup_profilePic" onClick={() => ProfilesetModalShow(true)}/>
              <Profile
                fileUrl = {fileUrl} 
                setFileUrl = {setFileUrl}
                file = {file}
                setFile = {setFile}
                show={ProfilemodalShow}
                onHide={() => ProfilesetModalShow(false)}
              />
            </div>
            :
            <div>
            <img style={Profileimage} id='profile_image' src={fileUrl} onClick={() => ProfilesetModalShow(true)}/>
              <Profile
                  fileUrl = {fileUrl} 
                  setFileUrl = {setFileUrl}
                  file = {file}
                  setFile = {setFile}
                  show={ProfilemodalShow}
                  onHide={() => ProfilesetModalShow(false)}
                />
              </div>
            
            }

            {/* 이메일 */}
            <div id="singup_content">
              <TextField label="Email" value={email.email} type="email" fullWidth required />
            </div>

            {/* 비밀번호 & 아이디 */}
            <div id="singup_content">
            <TextField  label="Password"  onChange={onChangePw} placeholder='Enter password' type="password" fullWidth required/>
            </div>
            <div id="singup_content">
            <TextField label="Re-Password"   onChange={onChangeRePw} placeholder='Enter password' type="password" fullWidth required />
            </div>
            <div id="singup_content">
              <TextField label="Username"   onChange={onChangeId} placeholder='Enter username' type="text" fullWidth required />
            </div>
            
            
            <div id='signup_cate_link'>
              <Row>
                <Col sm={6}>
                  {/* 관심사선택 */}
                  <Button id="signup_cate" variant="secondary" size="sm" onClick={() => LikeCategoryModalShow(true)}>
                    관심사 선택
                  </Button>
                  <LikeCategoryModal likearr={likearr} setLikearr={setLikearr} show={LikeCategorymodalShow} onHide={() => LikeCategoryModalShow(false)}/>
                </Col>

                <Col sm={6}>
                  {/* 약관동의 */}
                  <FormControlLabel id='signup_link_click' control={ <Checkbox name="checkedB" color='primary'/> } label="약관동의"/>
                  <Button id="signup_link" variant="primary" onClick={() => TermssetModalShow(true)}>
                      약관 확인
                  </Button>
                  <TermsModal show={TermsmodalShow} onHide={() => TermssetModalShow(false)}/>
                </Col>
              </Row>
            </div>

            {/* 회원가입 버튼 */}
            { (form.password === form.repassword && form.password && form.id) ?
            <div>
            <Button type="submit" color="primary" onClick={signup} variant='contained' style={btnStyle} fullWidth>Sign Up</Button>
            <br />
            <br />
            </div>
            : 
            <div>
            <Button type="submit" color="primary" onClick={signup} variant='contained' style={btnStyle} fullWidth disabled>Sign Up</Button>
            <br />
            <br />
            </div>
            }

            
            {/* 소셜 회원가입 */}
            <div id="signup_divider">
              <hr id="signup_line" />
              <p id="signup_sociallogin">소셜 회원가입</p>
              <hr id="signup_line" />
            </div>
            
            <img id="signup_oauthimage" src={process.env.PUBLIC_URL + "/image/kakaooauthimage.png"}/>

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