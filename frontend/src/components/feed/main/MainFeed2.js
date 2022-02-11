import React,{useState,useEffect} from 'react';
import Toggle from './Toggle';
import BookMarkPrint from '../bookMark/BookMarkPrint';
import LikePrint from '../like/LikePrint'
import {Container,Col,Row,Button} from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom'
import WriteModal from '../article/WriteModal'
import './css/MainFeed2.css'

export default function Mainfeed2(props) {

  const history = useHistory();

  const [WritemodalShow, WritesetModalShow] = React.useState(false);

  const style = {
    color : 'black',
  }

  const [toggled, setToggled] = useState(true);

  const Changotogle = () => {
    setToggled(toggled=>!toggled);
  }

  return (
  <Container id='MainFeed2_container'>
    <Row>
      <div id='MainFeed2_buttons'>
        <Container>
          <Row style={{marginLeft: "20%"}}>
              <Col xs={10}>
              <div style={{textAlign: "-webkit-right"}}>
                <Toggle onChange={(e)=>Changotogle(e)} />
                <p style={style}>{toggled ? "북마크" : "좋아요"}</p>
              </div>
            </Col>
            <Col xs={2}>
              <Button id="MainFeed2_Write_button" style={{width: "120px"}} variant="outline-success" onClick={() => WritesetModalShow(true)}>
                  <h6 style={{margin: "1px"}}>게시글 작성</h6>
              </Button> 
            </Col>
          </Row>
        </Container>
      </div>
        
      <WriteModal
        show={WritemodalShow}
        onHide={() => WritesetModalShow(false)}
      />
      {toggled? <BookMarkPrint setFootershow={props.setFootershow}/>:<LikePrint/>}
    </Row>
  </Container>
  );
}
