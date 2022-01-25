import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container,Row,Col} from 'react-bootstrap'

export default function Detail() {
  let params = useParams();
  useEffect(()=>{
    console.log(params)
  },[])
  return (
    <Container>
      <h1>⬅</h1>
      <Row style={{justifyContent:"space-around"}}>
        <Col xs={12} md={5} lg={5} 
        style={{border:"1px solid black"}}>
          <img 
          src='/test/4.3.png'
          style={{width:"100%",height:"auto"}}/>
        </Col>
        <Col xs={12} md={5} lg={5}
        style={{border:"1px solid black"}}>
          
          {/* 유저프로필,작성일 */}
          <div 
          style={{display:"flex",
          justifyContent:"space-between",
          height:"10%",
          marginTop:"10%"}}>

            <div style={{display:"flex"}}>
              <div 
              className="profile"
              style={{borderRadius:"50%",
              backgroundColor:"rgb(173, 219, 7)",
              width:"100%",
              height:"100%"}}>
                <img className="prof_img" 
                src={process.env.PUBLIC_URL + "/image/hello.png"}
                style={{width:"100%",
                  height:"100%",
                  objectFit:"cover",}}/>
              </div>
              <div>
                <h5>username</h5>
              </div>
            </div>

            <div>
              <h5>2022년 1월 1일</h5>
            </div>

          </div>
          
          {/* 카페이름 */}
          <div style={{marginLeft:"10%",marginBottom:"3%",marginTop:"3%"}}>
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
    </Container>
  )
}
