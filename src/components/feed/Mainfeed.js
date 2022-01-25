import React,{useState,useEffect} from 'react';
import Toggle from './Toggle';
import Feed from './Feed';
import SkeletonPrint from './SkeletonPrint'
import {Container,Col,Row,Button} from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom'
import WriteModal from './article/WriteModal'

export default function Mainfeed(props) {

  const history = useHistory();

  const [WritemodalShow, WritesetModalShow] = React.useState(false);

  let Writebutton = {
    fontSize: 13,
    width: 95,
  }

  const style = {
    color : 'black',
  }

  const [toggled, setToggled] = useState(true);

  const Changotogle = () => {
    setToggled(toggled=>!toggled);
  }

  return (
  <Container id="feedcontainer">
    <Row>
      <div className='buttons'>
        <Container>
          <Row>
            <Col>
              <div></div>
                <Link to="/bookmark"><Button variant="outline-primary" style={Writebutton}>북마크</Button></Link>{' '}
                <Button as="buttoncommon" style={Writebutton} variant="outline-success" onClick={() => WritesetModalShow(true)}>
                  게시글 작성
                </Button><br /> <br />                
                <div>
                  <Toggle onChange={(e)=>Changotogle(e)} />
                  <p style={style}>{toggled ? "피드형" : "블로그형"}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <WriteModal
          show={WritemodalShow}
          onHide={() => WritesetModalShow(false)}
        />

        {toggled? <Feed setFootershow={props.setFootershow}/>:<SkeletonPrint/>}

      </Row>
  </Container>
  );
}
