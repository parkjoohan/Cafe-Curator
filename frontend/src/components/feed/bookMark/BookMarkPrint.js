import "./css/BookMarkPrint.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookMarks from "./BookMarks";
import { Container, Button, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import WriteModal from '../article/WriteModal';
import $ from "jquery";
// import Toggle from '../main/Toggle';

function BookMarksPrint() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [WritemodalShow, WritesetModalShow] = React.useState(false);
  // const [toggled, setToggled] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let user = "a1"
    const url = `http://i6c104.p.ssafy.io:8080/feed/bookmarkList/${user}`
    axios.get(url,{
      params:{
      size:5,
      type:"blog",
      lastFeedNo:null,
    }}).then(function(res){
      setData(res.data)
      setIsLoading(false);
    }).catch(function(err){
      console.log('블로그형',err)
    })
  }, []);

  useEffect(()=>{
    window.addEventListener("scroll",moredata)
  },[data])

  const moredata = () => {
    // window.removeEventListener("scroll",moredata)
    // console.log(data)
    if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height()) {
      window.removeEventListener("scroll",moredata)
      console.log('밑이다!')
      let user = "a1"
      let lastNo = data[data.length-1].feedNo
      const url = `http://i6c104.p.ssafy.io:8080/feed/bookmarkList/${user}`
      axios.get(url,{
        params:{
        size:5,
        type:"blog",
        lastFeedNo:lastNo,
      }}).then(function(res){
        console.log(res.data)
        let newdata = [...data];
        let concatdata = newdata.concat(res.data);
        setData(concatdata)
      }).catch(err=>console.log(err))
    }
  }

    return (
      <div>
          <Container>
              <Row>
              <WriteModal
                  show={WritemodalShow}
                  onHide={() => WritesetModalShow(false)}
              />
              <div id='bookmark'>
                  <Container>
                      <div id="App">
                          <ul id="bookmark_contentWrapper">
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