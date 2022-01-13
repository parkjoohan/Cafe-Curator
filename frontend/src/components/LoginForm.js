import React, { useState } from "react";
import {Link} from 'react-router-dom'
import './css/LoginForm.css'
import {Form} from 'react-bootstrap'


function LoginForm({login, error}) {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  


  return (
    <Form className="form">
      <h1 className="title">로그인~~</h1>
      {error != "" ? <div className="error">{error}</div> : ""}
      <Form.Group className="item">
        <Form.Control
          className="input"
          placeholder="사용자 이메일"
          type="email"
          name="email"
          id="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="item">
        <Form.Control
          className="input"
          placeholder="비밀번호"
          type="password"
          name="password"
          id="password"
          onChange={(e) =>
            setDetails({ ...details, password: e.target.value })
          }
        />
      </Form.Group>
      <div className="button">로그인</div>

      <div className="divider">
        <hr className="line"/>
        <p className="sociallogin">소셜 아이디로 로그인</p>
        <hr className="line"/>
      </div>

      <div className="oauthlist">
        <img className="oauthimage" src={process.env.PUBLIC_URL + "/image/kakaooauthimage.png"}/>
        {/* <img className="oauthimage" src={process.env.PUBLIC_URL + "/image/naveroauthimage.png"}/> */}
      </div>

      <hr/>

      <div className="button">
        계정이 없으세요?
        <Link className="link" to="/Signup">회원가입</Link>
      </div>
      
    </Form>
  );
}

export default LoginForm;
