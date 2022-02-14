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

  const [WritemodalShow, WritesetModalShow] = React.useState(false);

  const style = {
    color : 'black',
  }

  const [toggled, setToggled] = useState(true);

  const Changotogle = () => {
    setToggled(toggled=>!toggled);
  }

  return (
  <Container>
    <Row>
      <div id='MainFeed_buttons'>
        <Container id='MainFeed_container'>
          <Row style={{marginLeft: "20%"}}>
              <Col xs={10}>
              <div style={{textAlign: "-webkit-right"}}>
                <Toggle onChange={(e)=>Changotogle(e)} />
                <p style={style}>{toggled ? "피드형" : "블로그형"}</p>
              </div>
            </Col>
            <Col xs={2}>
              <Button id="MainFeed_Write_button" variant="outline-success" onClick={() => WritesetModalShow(true)}>
                  <h6 id="mainfeed_Write_button_font" style={{margin: "1px "}}>게시글 작성</h6>
              </Button> 
            </Col>
          </Row>
        </Container>
      </div>
        
      <WriteModal
        show={WritemodalShow}
        onHide={() => WritesetModalShow(false)}
      />
      {toggled? <Feed setFootershow={props.setFootershow}/>:<Blog/>}
    </Row>
  </Container>
  );
}
