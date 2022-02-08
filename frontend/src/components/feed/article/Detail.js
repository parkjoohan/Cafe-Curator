import React,{useEffect,useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FiCornerUpLeft } from 'react-icons/fi';
import './css/Detail.css'
import Comment from "./Comment";
import axios from 'axios';

export default function Detail() {

  const [data,setData] = useState({})

  const [isselect,setIsselect] = useState([]);

  const history = useHistory();

  let {pk} = useParams();

  useEffect(()=>{
    const url = `http://i6c104.p.ssafy.io:8080/feed/detail/${pk}/a1`
    axios.get(url).then(res=>{
      setData(res.data);
      // let newArray = new Array(res.data.files.length);
      // for (let i = 0; i < newArray.length; i++) {
      //   if(i == 0){
      //     newArray[i] = true
      //   }else{
      //     newArray[i] = false
      //   }
      // }
      // setIsselect(newArray)
    })
  },[])


  // console.log(pk);
  
  return (
    <div style={{height: "1500px"}}>
      {/* 뒤로 가기 버튼 */}
      <div style={{marginLeft: "2%"}}>
        <FiCornerUpLeft size="30" onClick={() => { history.goBack() }} />
      </div><br />

      {/* 게시물 컨테이너 */}
      <div id='article_con'>
        <Row style={{ justifyContent: "space-around", height: "1400px"}}>
          {/* 사진 창 */}
          <Col id='article_frame' lg={5}>
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
                    <label for={`slide${index+1}`}>&nbsp;</label>
                  ))
                }
              </div>
            </div>
          </Col>

          {/* 게시물 창 */}
          <Col id='article_frame' lg={6}>
            {/* 유저프로필,작성일 */}
            <div id='article_profile_info'>
              <div style={{display:"flex"}}>
                <div id="article_profile_frame">
                  <img id="article_profile_prof_img" 
                  src={process.env.PUBLIC_URL + "/image/hello.png"}
                  />
                </div>
                <div id='article_username'>
                  <p>{data.userId}</p>
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
              <div style={{marginRight:"3%"}}>💓</div>
              <p style={{marginRight:"3%"}}>{data.likeCount}</p>
              <div style={{marginRight:"3%"}}>🔖</div>
              <p style={{marginRight:"3%"}}>북마크</p>
            </div>

            <div id='article_comment'>
              <Comment />
            </div>
            </Col>
          </Row>
        </div>
    </div>
  )
}
