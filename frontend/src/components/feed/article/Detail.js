import React,{useEffect,useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FiCornerUpLeft } from 'react-icons/fi';
import './css/Detail.css'
import axios from 'axios';

export default function Detail() {

  let params = useParams();
  useEffect(()=>{
    console.log(params)
  }, [])

  const history = useHistory();
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    // fetch('http://localhost:8080/comment')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     setComments(data);
    //   });
    fetch('http://localhost:8080/comment?feedNo=1&lastCommentNo=100&size=3&userNo=a1')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setComments(json)
      })
      .catch(err => {
      console.log(err)
    })
  }, []);

  return (
    <Container >
      {/* 뒤로 가기 버튼 */}
      <div>
        {comments.map((comment) => (
          <h1>{comment.content}</h1>
        ))}
      </div>
      <div>
        <FiCornerUpLeft size="30" onClick={() => { history.goBack() }} />
      </div><br />

      {/* 게시물 컨테이너 */}
      <div id='article_con'>
        <Row  style={{ justifyContent: "space-around"}}>
          {/* 사진 창 */}
          <Col id='article_frame' xs={12} md={5} lg={6}>
            <img 
              src='/test/4.3.png'
              id='article_article_img'
            />
          </Col>

          {/* 게시물 창 */}
          <Col id='article_frame' xs={12} md={7} lg={5}>
            
            {/* 유저프로필,작성일 */}
            <div id='article_profile_info'>
              <div style={{display:"flex"}}>
                <div id="article_profile_frame">
                  <img id="article_profile_prof_img" 
                  src={process.env.PUBLIC_URL + "/image/hello.png"}
                  />
                </div>
                <div id='article_username'>
                  <p>username</p>
                </div>
              </div>
              <div id='article_profile_date'>
                <h5>2022년 1월 1일</h5>
              </div>
            </div>
            
            {/* 카페이름 */}
            <div id='article_cafe_name'>
              <a href="#">OOcafe</a>
            </div>

            {/* 본문내용, 카페관심사태그 */}
            <div id='article_body'>
              {/* 본문 내용  */}
              <div id='article_content_frame'>
                <div di='article_content'>
                  contentcontentcontentcontentcontentcontent<br/>
                  contentcontentcontentcontentcontentcontent<br/>
                  contentcontentcontentcontentcontentcontent<br/>
                  contentcontentcontentcontentcontentcontent<br/>
                  contentcontentcontentcontentcontentcontent<br/>
                </div>
              </div>
              {/* 관심사 카테고리 표시 폼 */}
              <div id='article_category'>
                <p id='article_category_content' style={{ backgroundColor:"skyblue"}}>공부하기 좋은 카페</p>
                <p id='article_category_content' style={{ backgroundColor:"tomato" }}>공부하기 좋은 카페</p>
              </div>

              
            </div>

            {/* 하트 & 북마크*/}
            <div id='article_heart_bookmark'>
                <div style={{marginRight:"3%"}}>💓</div>
                <p style={{marginRight:"3%"}}>30</p>
                <div style={{marginRight:"3%"}}>🔖</div>
                <p style={{marginRight:"3%"}}>북마크</p>
            </div>

            <button onClick={setComments}>버튼</button>

            {/* 댓글 */}
            <div id='article_comment'>
              <p>총 3개의 댓글이 있습니다.</p>
                <div id='article_comment_frame'>
                  <div id='article_comments-frame'>
                  <div id='article_comments'>
                      <h5 id='article_comments_user'>username1</h5>
                      <h5 id='article_comments_content'>리뷰 1</h5>
                    </div>

                    <div id='article_comments'>
                      <h5 id='article_comments_user'>username2</h5>
                      <h5 id='article_comments_content'>리뷰 1</h5>
                    </div>
                    {comments.map((comment) => (
                    <div id='article_re_comments'>
                      <h5 id='article_comments_user'>{comment.userId}</h5>
                      <h5 id='article_tag_user'>@username2</h5>
                      <h5 id='article_comments_content'>리뷰 1</h5>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </Col>
          </Row>
        </div>
    </Container>
  )
}
