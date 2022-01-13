import React, { useState,useEffect } from "react";
import './css/SignupForm.css'
import {Form} from 'react-bootstrap'

export default function SignupForm() {

  useEffect(() => {
    const tag = document.getElementsByClassName("confirm")[0]
    
    tag.addEventListener('keydown',()=>{
      if(tag.value!==""){ setshowalert(true); } else { setshowalert(false) }
    })
    return () => {
      tag.removeEventListener('keydown',()=>{
        if(tag.value!==""){ setshowalert(true); } else { setshowalert(false) }
      })
      setshowalert(false);
    }
  }, [])

  

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation:"",
  });

  const [showalert,setshowalert] = useState(false)

  const [passwordCorrect,setpasswordCorrect] = useState(false);

  const isCorrect = e => {
    if ((e.target.value) == details.password){
      setpasswordCorrect(true)
    } else {setpasswordCorrect(false)}
  };



  return (
    <Form className="form">

      <h1 className="title">Signup</h1>
      <Form.Group className="item">
        <Form.Control
          className="input"
          placeholder="성명"
          type="text"
          name="name"
          id="name"
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          // value={details.name}
        />
      </Form.Group>
      <Form.Group className="item">
        <Form.Control
          className="input"
          placeholder="이메일 주소"
          type="email"
          name="email"
          id="email"
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
          // value={details.email}
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
          // value={details.password}
        />
      </Form.Group>
      <Form.Group className="item">
        <Form.Control
          className="input confirm"
          placeholder="비밀번호 확인"
          type="password"
          name="password"
          id="password"
          onChange={(e) =>isCorrect(e)}
          // value={details.password}
        />
        {showalert && (
        !passwordCorrect?
        <p className="alertpassword">비밀번호가 일치하지 않습니다.</p>
        :
        <p className="alertpassword" style={{color:'green'}}>비밀번호가 일치합니다.</p>
        )
        }
      </Form.Group>

      <div className="button"> 회원가입 </div>

      <div className="divider">
        <hr className="line"/>
        <p className="sociallogin">소셜 아이디로 로그인</p>
        <hr className="line"/>
      </div>

      <div className="oauthlist">
        <img className="oauthimage" src={process.env.PUBLIC_URL + "/image/kakaooauthimage.png"}/>
        {/* <img className="oauthimage" src={process.env.PUBLIC_URL + "/image/naveroauthimage.png"}/> */}
      </div>
      
      

    </Form>
  );
}