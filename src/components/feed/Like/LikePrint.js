import "./css/LikePrint.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Likes from "./Likes";
import { Container,Button, Col, Row } from 'react-bootstrap';
import WriteModal from '../article/WriteModal';
import { Link } from 'react-router-dom'

function LikesPrint() {
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
                <WriteModal
                    show={WritemodalShow}
                    onHide={() => WritesetModalShow(false)}
                />
            
                <div className='blog'>
                    <Container>
                        <div className="App">
                            <ul className="contentWrapper">
                            <Likes isLoading={isLoading} data={data} />
                            </ul>
                        </div>
                    </Container>
                </div>
                </Row>
            </Container>
        </div>
  );
}

export default LikesPrint;