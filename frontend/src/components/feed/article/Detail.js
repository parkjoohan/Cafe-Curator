import React,{useEffect,useRef,useState} from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { FiCornerUpLeft } from 'react-icons/fi';
import './css/Detail.css'
import Comment from "./Comment";
import axios from 'axios';
import Modifyarticle from './Modifyarticle';
import Likelist from './Likelist';

export default function Detail(props) {
  
  const childRef = useRef();
  const likeRef = useRef();
  const [data,setData] = useState({})
  const [isselect,setIsselect] = useState([]);
  const history = useHistory();
  const [likearr,setlikearr] = useState([]);
  const [isbookmark,setIsbookmark] = useState(true);
  const [modifymodalshow, setModifymodalshow] = useState(false);
  const [likemodalshow,setLikemodalshow] = useState(false);
  let {pk} = useParams();

  useEffect(()=>{
    if(childRef.current){
      childRef.current.setDetaildata(data)
    }
  },[modifymodalshow])

  useEffect(()=>{
    if(likeRef.current){
      let newdata={
        feedNo:data.feedNo,
        userNo:props.user[1],
        islike:likearr[1],
      }
      likeRef.current.setDetaildata(newdata)
    }
  },[likemodalshow])
  

  useEffect(()=>{
    if(props.user[0]==null){
      alert('로그인이 필요합니다!')
      history.goBack();  
    }
    const url = `http://i6c104.p.ssafy.io:8080/feed/detail/${pk}/${props.user[1]}`
    axios.get(url).then(res=>{
      console.log(res.data)
      setData(res.data);
      let likearr = [res.data.likeCount,res.data.liked];
      setlikearr(likearr);
      setIsbookmark(res.data.marked)
    })
  },[])

  const checkbookmark = () => {
    const url = `http://i6c104.p.ssafy.io:8080/feed/bookmark/${pk}/${props.user[1]}`
    axios.get(url).then(res=>{
      console.log(res.data)
      if (res.data == "SUCCESS : ADD BOOKMARK"){
        setIsbookmark(true);
      }else {
        setIsbookmark(false);
      }
    })
  }

  const likearticle = () => {
    console.log(props.user[1])
    const url = `http://i6c104.p.ssafy.io:8080/feed/like/${pk}/${props.user[1]}`
    axios.get(url).then(res=>{
      console.log(res.data)
      let newlikearr = [...likearr]
      if (res.data == "SUCCESS : ADD LIKE"){
        newlikearr[0]++;
        newlikearr[1] = true;
      }else{
        newlikearr[0]--;
        newlikearr[1] = false;
      }
      setlikearr(newlikearr)
    })
  }

  function gotoProfile(userId) {
    // console.log(localStorage);
    console.log(userId + "의 프로필로 갑시다");
    history.push(`/profile/${userId}`)
  }

  // console.log(pk);
  
  return (
    <>
      {/* 뒤로 가기 버튼 */}
      <div style={{float: "left", marginLeft: "13%", marginTop: "2%"}}>
        <FiCornerUpLeft size="30" onClick={() => { history.goBack() }} />
      </div>
      <div style={{ height: "1500px", marginTop: "4%", marginLeft: "12%" }}>
      {/* 게시물 컨테이너 */}
      <Row id='article_frame_row'>
        <Col id='article_frame_col' lg={4}>
          <div class="slider">
            {
              (data&&data.files)&&data.files.map((file,index)=>(
                <input type="radio" name="slide" id={`slide${index+1}`}/>
              ))
            }
              <ul id="article_picture_frame">
                {
                  (data&&data.files)&&data.files.map((file,index)=>(
                    <li><img id='article_picture' src={file.filePath}/></li>
                  ))  
                }
            </ul>
            <div class="bullets">
              {
                (data&&data.files)&&data.files.map((file,index)=>(
                  <label htmlFor={`slide${index+1}`}>&nbsp;</label>
                ))
              }
            </div>
          </div>
        </Col>
        <Col id='article_frame_col2' lg={6}>
          <Row>
            {/* 유저프로필,작성일 */}
            <div id='article_profile_info'>
              <div style={{display:"flex",alignItems: "center"}}>
                <div id="article_profile_frame">
                  <img id="article_profile_prof_img" 
                  src={process.env.PUBLIC_URL + "/image/hello.png"}
                  />
                </div>
                <div id='article_username'>
                  <p onClick={()=>gotoProfile(data.userId)}>{data.userId}</p>
                </div>
              </div>
              <div id='article_profile_date'>
                <h5>{data.regTime}</h5>
              </div>
            </div>

            {/* 카페이름 */}
            <div id='article_cafe_name'>
              <a href="#">{data.cafeName}</a>
            </div>
          </Row>
          <Row>
            {/* 본문내용, 카페관심사태그 */}
            <div id='article_body'>
              {/* 본문 내용  */}
              <div id='article_content_frame'>
                <div di='article_content'>
                  {data.content}
                </div>
              </div>
              {/* 관심사 카테고리 표시 폼 */}
              <div id='article_category'>
                {
                  (data && data.categoryList) && data.categoryList.map((category,index)=>(
                    <p key={index} id='article_category_content' style={{ backgroundColor:"skyblue"}}>{category}</p>
                  ))
                }
              </div>
            </div>

            {/* 하트 & 북마크*/}
            <div id='article_heart_bookmark'>
              {
                likearr[1]?
                <img src={`${process.env.PUBLIC_URL}/image/heart.png`} width="30px%" height="40px" onClick={likearticle}/>:
                <img src={`${process.env.PUBLIC_URL}/image/empty_heart.png`} width="30px%" height="40px" onClick={likearticle}/>
              }
              <div style={{width:"50px", textAlignLast: "center", textAlignLast: "center"}}>
                <p style={{marginLeft:"3%"}} onClick={()=>setLikemodalshow(true)}>{likearr[[0]]}</p>
              </div>
              {
                isbookmark?
                <img src={`${process.env.PUBLIC_URL}/image/bookmark.png`} width="30px" height="40px" onClick={checkbookmark}/>:
                <img src={`${process.env.PUBLIC_URL}/image/empty_bookmark.png`} width="30px" height="40px" onClick={checkbookmark}/>
              }
              <div style={{width:"70px"}}>
                <p style={{marginRight:"3%", marginLeft:"8%"}}>북마크</p>
              </div>
              {data.userId==props.user[0]&&
              <Button onClick={()=>setModifymodalshow(true)}>수정</Button>
              }
            </div>
          </Row>
          <Row>
            <div id='article_comment'>
              <Comment user={props.user}/>
            </div>
          </Row>
        </Col>
      </Row>
      <Modifyarticle
        show={modifymodalshow}
        onHide={() => setModifymodalshow(false)}
        ref = {childRef}
        data={data}
        user={props.user}
        pk={pk}
        />
      <Likelist
        show={likemodalshow}
        onHide={() => setLikemodalshow(false)}
        ref = {likeRef}
      />
    </div>
    </>
    
  )
}
