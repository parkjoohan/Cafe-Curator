import "./css/BookMarkPrint.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookMarks from "./BookMarks";
import { Container,Button, Col, Row } from 'react-bootstrap';
import WriteModal from './article/WriteModal';
import { Link } from 'react-router-dom'

function BookMarksPrint() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [WritemodalShow, WritesetModalShow] = React.useState(false);

  useEffect(() => {
    setIsLoading(true);

    // Intentionally delay the function execution
    new Promise(res => {
      setTimeout(() => {
        res();
      }, 3000);
    }).then(() => {
      axios.get("https://reqres.in/api/users?page=2").then(res => {
        setData(res.data.data);
        setTimeout(() => setIsLoading(false), 2000);
      });
    });
  }, []);

    return (
        <div>
            <Container>
                <Row>
                <div className='buttons'>
                    <Container>
                        <Row>
                            <Col>
                                <Link to="/feed"><Button variant="outline-primary" style={{fontSize: "13", width: "140"}}>피드형 & 블로그형</Button></Link>{' '}
                                <Button as="buttoncommon" style={{fontSize: "13",width: "95"}} variant="outline-success" onClick={() => WritesetModalShow(true)}>
                                    게시글 작성
                                </Button>
                            </Col>
                        </Row>
                        </Container>
                </div>

                <WriteModal
                    show={WritemodalShow}
                    onHide={() => WritesetModalShow(false)}
                />
            
                <div className='blog'>
                    <Container>
                        <div className="App">
                            <ul className="contentWrapper">
                            <BookMarks isLoading={isLoading} data={data} />
                            </ul>
                        </div>
                    </Container>
                </div>
                </Row>
            </Container>
        </div>
  );
}

export default BookMarksPrint;