import React, { useState, useEffect } from "react";
import "./css/LoginForm.css";
import { Modal, Form } from "react-bootstrap";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

// function temp_pw_issuance() {
// 	let ranValue1 = ['1','2','3','4','5','6','7','8','9','0'];
// 	let ranValue2 = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
// 	let ranValue3 = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
// 	let ranValue4 = ['!','@','#','$','%','^','&','*','(',')'];

// 	var temp_pw = "";

// 	for(let i=0 ; i<2; i++) {
// 		let ranPick1 = Math.floor(Math.random() * ranValue1.length);
// 		let ranPick2 = Math.floor(Math.random() * ranValue2.length);
// 		let ranPick3 = Math.floor(Math.random() * ranValue3.length);
// 		let ranPick4 = Math.floor(Math.random() * ranValue4.length);
// 		temp_pw = temp_pw + ranValue1[ranPick1] + ranValue2[ranPick2] + ranValue3[ranPick3] + ranValue4[ranPick4];
// 	}

//   return temp_pw
// }

export default function LoginForm({ setUser }) {
  let location = useLocation();
  let history = useHistory();

  const avatarStyle = {
    background: "#1bbd7e",
  };

  const btnStyle = {
    margin: "8px, ",
  };
  const [pw, setpw] = useState(null);
  const [Repw, setRepw] = useState(null);
  const [hideinput, setHideInput] = useState(false);
  const [pwshow, setPwshow] = useState(false);
  const [doorLock, setDoorLock] = useState(false);
  const [loginEmail, setloginEmail] = useState(null);
  const [loginPw, setloginPw] = useState(null);
  const [show, setShow] = useState(false);
  const [emailforfind, setEmailforfind] = useState("");
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseandSend = async () => {
    await handleClose();
    setHideInput(false);
    setDoorLock(false);
    setPwshow(true);
  };

  const onChangeEmail = (e) => {
    setloginEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setloginPw(e.target.value);
  };

  const onClickLogin = async () => {
    try {
      console.log(loginEmail);
      console.log(loginPw);
      const response = await axios.post(
        "http://i6c104.p.ssafy.io:8080/api/users/login",
        {
          email: loginEmail,
          pass: loginPw,
        }
      );
      console.log(response.data);
      localStorage.setItem("userNo", response.data.userNo);
      localStorage.setItem("userPic", response.data.picture);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userIntro", response.data.introduction);
      localStorage.setItem("userEmail", loginEmail);

      setUser([response.data.userId, response.data.userNo]);
      history.goBack();
    } catch (error) {
      alert("사건발생");
    }
  };

  const onClickSend = async (e) => {
    e.preventDefault();
    try {
      //응답 성공

      const response = await axios.post(
        `http://i6c104.p.ssafy.io:8080/api/users/findPassSendEmail/${emailforfind}`,
        {
          //보내고자 하는 데이터
          email: emailforfind,
        }
      );
      console.log(response);
      console.log(response.email);
      setHideInput(true);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  };

  const [validate, setValidate] = useState(null);

  const onChangeCode = (e) => {
    setValidate(e.target.value);
  };

  const onClickCheck = async () => {
    try {
      //응답 성공
      console.log(emailforfind);
      console.log(validate);
      const response = await axios.post(
        "http://i6c104.p.ssafy.io:8080/api/users/verifyCode",
        {
          //보내고자 하는 데이터
          code: validate,
          email: emailforfind,
        }
      );

      // console.log(response.data);
      setDoorLock(response.data);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  };
  const passwordChange = async () => {
    console.log(emailforfind);
    console.log(pw);
    const response = await axios.post(
      "http://i6c104.p.ssafy.io:8080/api/users/updatePass",
      {
        email: emailforfind,
        pass: pw,
      }
    );
    if (response.data) {
      setPwshow(false);
    } else {
      alert("뭔가 오류가있는듯합니다.");
    }
  };

  const googleLogin = async () => { 
    axios.get(`http://i6c104.p.ssafy.io:8080/login/oauth/getGoogleAuthURL`).then(function (res) {
      // console.log(res.data)
      window.location.href = res.data;
    })
  }

  function gotoKaKaoLogin() {
    axios
      .get("http://i6c104.p.ssafy.io:8080/login/oauth/getKakaoAuthURL")
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <Grid style={{ width: "100%" }}>
        <div id="login_content">
          <Paper elevation={10} id="login_paperStyle">
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Login</h2>
            </Grid>
            <br />
            <TextField
              onChange={onChangeEmail}
              label="Email"
              placeholder="Enter email"
              fullWidth
              required
            />
            <br />
            <br />
            <TextField
              onChange={onChangePassword}
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="아이디 기억하기"
            />
            <br />
            <br />
            <Button
              type="submit"
              onClick={onClickLogin}
              color="primary"
              variant="contained"
              style={btnStyle}
              fullWidth
            >
              Login In
            </Button>
            <br />
            <br />

            {/* 소셜 회원가입 */}
            <div id="login_divider">
              <hr id="login_line" />
              <p id="login_sociallogin">소셜 회원가입</p>
              <hr id="login_line" />
            </div>

            <img
              id="login_oauthimage"
              src={process.env.PUBLIC_URL + "/image/kakaooauthimage.png"}
              onClick={() => gotoKaKaoLogin()}
            />

            <button onClick={googleLogin}>
              {/* <a href={googleUrl}>구글 로그인</a> */}
              구글 로그인
            </button>

            <hr />

            <Typography id="login_gosignup">
              {" "}
              회원가입하기 &nbsp;
              <Link className="link" to="/email" id="login_gosignup2">
                Sign Up
              </Link>
            </Typography>
            <Typography id="login_findpw">
              {" "}
              비밀번호가 생각나지 않으세요? &nbsp;
              <Link className="link" onClick={handleShow} id="login_findpw2">
                비밀번호 변경
              </Link>
            </Typography>
            <br />
          </Paper>
        </div>
      </Grid>

      <Modal show={show} onHide={handleClose} className="Modal">
        <Modal.Header id="loginform_Modalhead" closeButton></Modal.Header>
        <Modal.Body>
          <p className="passwordchangemessage">
            입력한 주소로 임시 비밀번호를 보냅니다.
          </p>
          <input
            id="input"
            type="email"
            onChange={(e) => {
              setEmailforfind(e.target.value);
            }}
            name="email"
            placeholder="이메일을 입력하세요.."
            style={{ marginBottom: "3%" }}
          />
          <Button onClick={onClickSend} id="email_validate_submit">
            전송
          </Button>
          {hideinput ? (
            <div>
              <input
                id="input"
                type="validate"
                onChange={onChangeCode}
                name="validate"
                placeholder="인증코드를 입력하세요.."
                style={{ marginBottom: "8%", marginTop: "3%" }}
              />
              <Button onClick={onClickCheck} id="email_validate_submit">
                확인
              </Button>
            </div>
          ) : null}

          <p className="passwordchangemessage">
            서버 상황에 따라 5분정도 늦어질 수 있습니다.
            <br />
            임시 비밀번호를 발급받고 꼭 비밀번호를 바꿔주세요!
          </p>
        </Modal.Body>
        <Modal.Footer>
          {doorLock ? (
            <Button variant="primary" onClick={handleCloseandSend}>
              비밀번호 수정하기
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCloseandSend} disabled>
              비밀번호 수정하기
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Modal show={pwshow} onHide={handleClose} className="Modal">
        <Modal.Header id="loginform_Modalhead" closeButton></Modal.Header>
        <Modal.Body>
          <p className="passwordchangemessage">비밀번호 변경</p>
          <input
            id="input"
            type="password"
            onChange={(e) => {
              setpw(e.target.value);
            }}
            name="pw"
            placeholder="비밀번호를 입력하세요.."
            style={{ marginBottom: "3%" }}
          />
          <input
            id="input"
            type="password"
            onChange={(e) => {
              setRepw(e.target.value);
            }}
            name="Repw"
            placeholder="비밀번호 확인.."
            style={{ marginBottom: "8%", marginTop: "3%" }}
          />
        </Modal.Body>
        <Modal.Footer>
          {pw === Repw ? (
            <Button variant="primary" onClick={passwordChange}>
              비밀번호 수정하기
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCloseandSend} disabled>
              비밀번호 수정하기
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
