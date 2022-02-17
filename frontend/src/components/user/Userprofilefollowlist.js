import React,{useState,useEffect,useRef, useImperativeHandle, forwardRef} from 'react';
import  { Container, Modal } from 'react-bootstrap';
import {TextField, Button} from '@material-ui/core';
import { Row,Col } from 'react-bootstrap'
import axios from 'axios'
import $ from "jquery";
import { useHistory } from 'react-router-dom';
// import "./css/Likelist.css";



const Userprofilefollowlist = forwardRef(({show, onHide, data},ref) => {

  useImperativeHandle(ref,()=>({
    setDetaildata,
  }))

  const history = useHistory();
  
  const [detaildata,setDetaildata] = useState(null);

  const [followperson,setFollowperson] = useState([])

  const [islike,setIslike] = useState(false)

  useEffect(()=>{
    if(detaildata!=null){
      const followlisturl = `http://i6c104.p.ssafy.io:8080/following/`
        axios.get(followlisturl,{
          params:{
            userNo:detaildata[0],
            size:5,
            lastUserNo:null,
            loginUserNo:detaildata[1],
        }}
        ).then(res=>{
          console.log('팔로워리스트',res.data)
          setFollowperson(res.data)
    })
    }
  },[detaildata])

  useEffect(()=>{
    console.log(followperson)
    let container = document.getElementById('likelist_container');
    if(container){
      container.addEventListener('scroll',morelike)
    }
  },[followperson])

  const morelike=(e)=>{
    if(e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight){
      let container = document.getElementById('likelist_container');
      container.removeEventListener('scroll',morelike)
      console.log('맨 밑이다!')
      if(followperson){
        let lastuserNo = followperson[followperson.length-1].userNo
        const url = `http://i6c104.p.ssafy.io:8080/following/`
        axios.get(url,{params:{
          userNo:detaildata[0],
          size:5,
          lastUserNo:lastuserNo,
          loginUserNo:detaildata[1],
      }}).then(res=>{
          let newfollowpersonarr = [...followperson];
          newfollowpersonarr = newfollowpersonarr.concat(res.data)
          setFollowperson(newfollowpersonarr)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }

  const follow = (userNo,index) => {
    const followurl = `http://i6c104.p.ssafy.io:8080/follow/${detaildata[1]}/${userNo}`
    axios.get(followurl).then(res=>{
      let newfollowperson = [...followperson];
      let newfollowperson2 = {...newfollowperson[index]}
      newfollowperson2.status = !newfollowperson2.status;
      newfollowperson[index] = newfollowperson2;
      setFollowperson(newfollowperson);
    })
  }

  const gotoProfile = (id) => {
    history.push(`/profile/${id}`)
    document.location.reload();
  }

  return (
    <Modal
      size='xs'
      show = {show}
      onHide = {onHide}
    >
      <div id="likelist_navcolor"></div>
      <Modal.Header>
      <h3 id="likelist_Margin_Underline">팔로워</h3>
      </Modal.Header>

      <Modal.Body >
        <Container id='likelist_container'>
          {
            islike && <div id='likelist_my'>
                <strong id='likelist_my_id'>나</strong>
              </div>
          }
          <hr />
          {followperson.map((ppl,index)=>(
            <div id='likelist_people'>
              {
                ppl.picture != null ?
                <img id="blogs_img2" src={ppl.picture} alt="" /> :
                <img id="blogs_img2" src='../image/Profileimage.png'/>
              }
              {
                ppl.userNo == detaildata[1]?
                <strong id='likelist_people_userid'>나</strong>:
                <strong id='likelist_people_userid' onClick={()=>gotoProfile(ppl.userId)}>{ppl.userId}</strong>
              }
              {
                (ppl.userNo != detaildata[1] && !ppl.status)&&<span id='likelist_people_follow' onClick={()=>follow(ppl.userNo,index)}>팔로우</span>
              }
              {
                (ppl.userNo != detaildata[1] && ppl.status)&&<span id='likelist_people_unfollow' onClick={()=>follow(ppl.userNo,index)}>팔로우중</span>
              }
            </div>
          ))}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button id="likelist_NoBgButton" onClick={()=>onHide()}>작성</Button>
      </Modal.Footer>
    </Modal>
  )
})
export default Userprofilefollowlist