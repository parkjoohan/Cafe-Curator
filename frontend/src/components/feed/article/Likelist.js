import React,{useState,useEffect,useRef, useImperativeHandle, forwardRef} from 'react';
import  { Container, Modal } from 'react-bootstrap';
import {TextField, Button} from '@material-ui/core';
import { Row,Col } from 'react-bootstrap'
import axios from 'axios'
import $ from "jquery";
import { useHistory } from 'react-router-dom';
import "./css/Likelist.css";



const Likelist = forwardRef(({ show, onHide, data }, ref) => {
  
  const history = useHistory();

  useImperativeHandle(ref,()=>({
    setDetaildata,
  }))

  const [detaildata,setDetaildata] = useState(null);

  const [likeperson,setLikeperson] = useState([])

  const [islike,setIslike] = useState(false)

  useEffect(()=>{
    
    
    if(detaildata!=null){
      setIslike(detaildata.islike);
      const url = `http://i6c104.p.ssafy.io:8080/feed/likeUserList/`
      axios.get(url,{params:{
        feedNo:detaildata.feedNo,
        size:10,
        userNo:detaildata.userNo,
      }}).then(res=>{
        setLikeperson(res.data)
        // console.log(likeperson)
      }).catch(err=>{
        // console.log(err)
      })
    }
  },[detaildata])

  useEffect(()=>{
    let container = document.getElementById('likelist_container');
    if(container){
      container.addEventListener('scroll',morelike)
    }
  },[likeperson])

  const morelike=(e)=>{
    if(e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight){
      let container = document.getElementById('likelist_container');
      container.removeEventListener('scroll',morelike)
      // console.log('맨 밑이다!')
      // console.log(likeperson)
      if(likeperson){
        let lastuserNo = likeperson[likeperson.length-1].userNo
        const url = `http://i6c104.p.ssafy.io:8080/feed/likeUserList/`
        axios.get(url,{params:{
          feedNo:detaildata.feedNo,
          size:10,
          lastUserNo:lastuserNo,
          userNo:detaildata.userNo,
        }}).then(res=>{
          let newlikepersonarr = [...likeperson];
          newlikepersonarr = newlikepersonarr.concat(res.data)
          setLikeperson(newlikepersonarr)
        }).catch(err=>{
          // console.log(err)
        })
      }
    }
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
      <h3 id="likelist_Margin_Underline">좋아요 한 사람</h3>
      </Modal.Header>

      <Modal.Body >
        <Container id='likelist_container'>
          {
            islike && <div id='likelist_my'>
                <strong id='likelist_my_id'>나</strong>
              </div>
          }
          <hr />
          {likeperson.map((ppl,index)=>(
            <div id='likelist_people'>
              {
                ppl.picture != null ?
                <img id="blogs_img2" src={ppl.picture} alt="" /> :
                <img id="blogs_img2" src='../image/Profileimage.png'/>
              }
              <strong id='likelist_people_userid' onClick={()=>gotoProfile(ppl.userId)}>{ppl.userId}</strong>
              {
                !ppl.status&&<span id='likelist_people_follow'>팔로우</span>
              }
              {
                ppl.status&&<span id='likelist_people_unfollow'>팔로우중</span>
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
export default Likelist