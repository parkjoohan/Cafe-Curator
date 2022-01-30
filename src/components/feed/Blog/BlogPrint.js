import "./css/BlogPrint.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import { Container, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import WriteModal from '../article/WriteModal';
// import Toggle from '../main/Toggle';

function BlogPrint() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [WritemodalShow, WritesetModalShow] = React.useState(false);
  // const [toggled, setToggled] = useState(false);
  const history = useHistory();

  const style = {
    color : 'black',
  }

  let Writebutton = {
    fontSize: 13,
    width: 95,
  }
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
          <WriteModal
              show={WritemodalShow}
              onHide={() => WritesetModalShow(false)}
          />
      
          <div className='blog'>
              <Container>
                  <div className="App">
                      <ul className="contentWrapper">
                      <Blogs isLoading={isLoading} data={data} />
                      </ul>
                  </div>
              </Container>
          </div>
        </div>
  );
}

export default BlogPrint;