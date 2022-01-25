import React,{useEffect,useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FiCornerUpLeft } from 'react-icons/fi';
import './css/Detail.css'

export default function Detail() {

  let params = useParams();
  useEffect(()=>{
    console.log(params)
  }, [])
  const history = useHistory();

  return (
    <Container>
      {/* 뒤로 가기 버튼 */}
      <div>
        <FiCornerUpLeft size="30" onClick={() => { history.goBack() }} />
      </div><br />

      {/* 게시물 컨테이너 */}
      <div>
        <Row style={{ justifyContent: "space-around" }}>
          {/* 사진 창 */}
          <Col xs={12} md={5} lg={5} 
          style={{border:"1px solid black"}}>
            <img 
            src='/test/4.3.png'
            style={{width:"100%",height:"auto"}}/>
          </Col>

          {/* 게시물 창 */}
          <Col xs={12} md={5} lg={5}
          style={{border:"1px solid black"}}>
            
            {/* 유저프로필,작성일 */}
            <div className='profile_info'>
              <div style={{display:"flex"}}>
                <div className="profile_frame">
                  <img className="prof_img" 
                  src={process.env.PUBLIC_URL + "/image/hello.png"}
                  />
                </div>
                <div className='username'>
                  <h5>username</h5>
                </div>
              </div>
              <div className='profile_date'>
                <h5>2022년 1월 1일</h5>
              </div>
            </div>
            
            {/* 카페이름 */}
            <div className='cafe_name'>
              <a href="#">OOcafe</a>
            </div>

            {/* 본문내용, 카페관심사태그 */}
            <div style={{display:'flex',flexDirection:"column",alignItems:"center"}}>

              <div style={{border:"1px solid black",
              width:"80%",padding:"5px 10px",textOverflow: "ellipsis",overflow: "hidden"}}>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
                contentcontentcontentcontentcontentcontent<br/>
              </div>
              <div style={{display:"flex",width:"80%",marginTop:"3%",justifyContent:"flex-start"}}>
                <p style={{marginRight:"3%", backgroundColor:"skyblue", padding:"5px"}}>공부하기 좋은 카페</p>
                <p style={{marginRight:"3%", backgroundColor:"tomato", padding:"5px"}}>공부하기 좋은 카페</p>
              </div>

              
            </div>

            {/* 하트 & 북마크*/}
            <div style={{display:"flex",width:"80%",marginTop:"1%",marginLeft:"10%",justifyContent:"flex-start"}}>
                <div style={{marginRight:"3%"}}>❤</div>
                <p style={{marginRight:"3%"}}>30</p>
                <div style={{marginRight:"3%"}}>🔖</div>
                <p style={{marginRight:"3%"}}>북마크</p>
            </div>

            {/* 댓글 */}
            <div style={{display:"flex",flexDirection:"column",width:"80%",marginTop:"1%",marginLeft:"10%",justifyContent:"flex-start"}}>
              <p>총 3개의 댓글이 있습니다.</p>
              <div style={{border:"1px solid black",display:"flex",flexDirection:"column",padding:"3%"}}>

                <div style={{display:"flex"}}>
                  <h5>username1</h5>
                  <h5 style={{marginLeft:"3%"}}>리뷰 1</h5>
                </div>

                <div style={{position:"relative",display:"flex"}}>
                  <h5>username2</h5>
                  <h5 style={{marginLeft:"3%"}}>리뷰 1</h5>
                </div>

                <div style={{position:"relative",display:"flex",top:"20%",left:"20%"}}>
                    <h5>username3</h5>
                    <h5 style={{marginLeft:"3%"}}>@username2 리뷰 1</h5>
                </div>
              </div>
            </div>
          </Col>
          </Row>
        </div>
    </Container>
  )
}
