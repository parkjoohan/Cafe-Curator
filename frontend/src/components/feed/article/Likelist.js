import React,{useState,useEffect,useRef, useImperativeHandle, forwardRef} from 'react';
import  { Container, Modal } from 'react-bootstrap';
import {TextField, Button} from '@material-ui/core';
import { Row,Col } from 'react-bootstrap'
import axios from 'axios'
import $ from "jquery";



const Likelist = forwardRef(({show, onHide, data},ref) => {

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
        size:5,
        userNo:detaildata.userNo,
      }}).then(res=>{
        setLikeperson(res.data)
      }).catch(err=>{
        console.log(err)
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
      console.log('맨 밑이다!')
      console.log(likeperson)
      if(likeperson){
        let lastuserNo = likeperson[likeperson.length-1].userNo
        const url = `http://i6c104.p.ssafy.io:8080/feed/likeUserList/`
        axios.get(url,{params:{
          feedNo:detaildata.feedNo,
          size:5,
          lastUserNo:lastuserNo,
          userNo:detaildata.userNo,
        }}).then(res=>{
          let newlikepersonarr = [...likeperson];
          newlikepersonarr = newlikepersonarr.concat(res.data)
          setLikeperson(newlikepersonarr)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }

  return (
    <Modal
      size='xs'
      show = {show}
      onHide = {onHide}
    >
      <div id="writemodal_navcolor"></div>
      <Modal.Header>
      <h3 id="writemodal_Margin_Underline">좋아요 한 사람</h3>
      </Modal.Header>

      <Modal.Body >
        <Container id='likelist_container' style={{overflowY: 'auto',height:"500px"}}>
          {
            islike&&<div style={{height:"20%",border:"1px solid black",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:"20px"}}>나</span>
              </div>
          }
          {likeperson.map((ppl,index)=>(
            <div style={{height:"100px",border:"1px solid black",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:"20px"}}>{ppl.userId}</span>
              {
                !ppl.status&&<span style={{fontSize:"20px"}}>팔로우하기</span>
              }
              {
                ppl.status&&<span style={{fontSize:"20px"}}>팔로우중</span>
              }
            </div>
          ))}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button id="writemodal_NoBgButton" onClick={()=>onHide()}>작성</Button>
      </Modal.Footer>
    </Modal>
  )
})
export default Likelist