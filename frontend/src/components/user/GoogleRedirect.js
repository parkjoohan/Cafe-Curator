import React, { useEffect } from 'react'
import axios from 'axios'
import { useHistory, useLocation } from "react-router-dom";

const GoogleRedirect = ({setUser}) => {
   
   let code = new URL(window.location.href).searchParams.get("code");
   // console.log(code);

   let history = useHistory();

   useEffect(() => {
      
      axios.get('http://i6c104.p.ssafy.io:8080/login/oauth/google', {
         params: {code: code}
      }).then(function (response) {
         // console.log(response);

         localStorage.setItem('userNo', response.data.userNo);
         localStorage.setItem('userPic', response.data.picture);
         localStorage.setItem('userId', response.data.userId);
         localStorage.setItem('userIntro', response.data.introduction);
         setUser([response.data.userId, response.data.userNo])
         history.push('/')
      });
   }, []);
   
   return (
      <>
         구글 로그인 중
      </>
   )
}
export default GoogleRedirect