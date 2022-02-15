import React,{useState,useEffect} from 'react';
import Toggle from './Toggle';
import Feed from './Feed';
import Blog from '../blog/BlogPrint'
import {Container,Col,Row,Button} from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom'
import WriteModal from '../article/WriteModal'
import './css/MainFeed.css'

export default function Mainfeed(props) {

  const history = useHistory();

  //mainfeed는 뭐냐? 네브바에서 feed&blog눌렀을때 나오는 그 화면
  //

  const [WritemodalShow, WritesetModalShow] = React.useState(false);

  const style = {
    color : 'black',
  }

  const [toggled, setToggled] = useState(true);

  const Changotogle = () => {
    setToggled(toggled=>!toggled);
  }

  const onClick = () => {
    if(props.user[0]==null){
      if(WritemodalShow==false){
        alert('로그인이 필요합니다!')
      }
    }else{
      WritesetModalShow(prev=>!prev);
    }
  }
  return (
  <Container>
    <Row>
      <div id='MainFeed_buttons'>
        <Container id='MainFeed_container'>
          <Row style={{marginLeft: "20%"}}>
              <Col xs={10}>
                <div style={{width: "80%"}}>
                  <Toggle onChange={(e) => Changotogle(e)} />
                </div>
              <div style={{textAlign: "-webkit-right"}}>
                <p id='MainFeed_toggle_font' style={style}>{toggled ? "피드형" : "블로그형"}</p>
              </div>
            </Col>
            <Col xs={2}>
              {props.user[0]&&
              <Button id="MainFeed_Write_button" variant="outline-success" onClick={() => onClick()}>
                  <h6 id="mainfeed_Write_button_font" style={{margin: "1px "}}>게시글 작성</h6>
              </Button> 
              }
            </Col>
          </Row>
        </Container>
      </div>
        
      <WriteModal
        show={WritemodalShow}
        onHide={() => WritesetModalShow(false)}
        user={props.user}
      />
      {toggled? <Feed setFootershow={props.setFootershow} user={props.user}/>:<Blog/>}
    </Row>
  </Container>
  );
}
