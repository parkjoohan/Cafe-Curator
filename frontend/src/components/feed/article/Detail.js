/*global kakao*/
import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiCornerUpLeft } from "react-icons/fi";
import "./css/Detail.css";
import Comment from "./Comment";
import axios from "axios";
import Modifyarticle from "./Modifyarticle";
import Likelist from "./Likelist";

export default function Detail(props) {
  const childRef = useRef();
  const likeRef = useRef();
  const [data, setData] = useState({});
  const [isselect, setIsselect] = useState([]);
  const history = useHistory();
  const [likearr, setlikearr] = useState([]);
  const [isbookmark, setIsbookmark] = useState(true);
  const [modifymodalshow, setModifymodalshow] = useState(false);
  const [likemodalshow, setLikemodalshow] = useState(false);
  let { pk } = useParams();

  useEffect(() => {
    if (childRef.current) {
      childRef.current.setDetaildata(data);
    }
  }, [modifymodalshow]);

  useEffect(() => {
    if (likeRef.current) {
      let newdata = {
        feedNo: data.feedNo,
        userNo: props.user[1],
        islike: likearr[1],
      };
      likeRef.current.setDetaildata(newdata);
    }
  }, [likemodalshow]);

  useEffect(() => {
    if (props.user[0] == null) {
      alert("로그인이 필요합니다!");
      history.goBack();
    }
    const url = `http://i6c104.p.ssafy.io:8080/feed/detail/${pk}/${props.user[1]}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      setData(res.data);
      let likearr = [res.data.likeCount, res.data.liked];
      setlikearr(likearr);
      setIsbookmark(res.data.marked);
    });
  }, []);

  const checkbookmark = () => {
    const url = `http://i6c104.p.ssafy.io:8080/feed/bookmark/${pk}/${props.user[1]}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      if (res.data == "SUCCESS : ADD BOOKMARK") {
        setIsbookmark(true);
      } else {
        setIsbookmark(false);
      }
    });
  };

  const likearticle = () => {
    console.log(props.user[1]);
    const url = `http://i6c104.p.ssafy.io:8080/feed/like/${pk}/${props.user[1]}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      let newlikearr = [...likearr];
      if (res.data == "SUCCESS : ADD LIKE") {
        newlikearr[0]++;
        newlikearr[1] = true;
      } else {
        newlikearr[0]--;
        newlikearr[1] = false;
      }
      setlikearr(newlikearr);
    });
  };
  function deleteFeed(feedNo) {
    console.log(feedNo);
    axios.delete(`http://i6c104.p.ssafy.io:8080/feed/${feedNo}/${props.user[1]}`).then(window.location.reload())
}
  function gotoProfile(userId) {
    // console.log(localStorage);
    console.log(userId + "의 프로필로 갑시다");
    history.push(`/profile/${userId}`);
  }

  const gotoCategory = (category) => {
    console.log("category : ",category);
    history.push(`/categorysearch`);
  }

  const gotoCafeprofile = (name) => {
    let pk = 0;
    const url = `http://i6c104.p.ssafy.io:8080/cafe/${name}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      const url2 = `http://i6c104.p.ssafy.io:8080/cafe`;
      axios
        .get(url2, {
          params: { cafeX: res.data.cafeX, cafeY: res.data.cafeY },
        })
        .then((res) => (pk = res.data));
    });

    var ps = new kakao.maps.services.Places();
    ps.keywordSearch(name, placesSearchCB);
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].place_name == name) {
            history.push({
              pathname: `/store/${pk}/${Number(data[i].id)}`,
              state: { name: name },
            });
          }
        }
      }
    }
  };

  return (
    <>
      {/* 뒤로 가기 버튼 */}
      <div id='article_back_func'>
        <FiCornerUpLeft id='article_back' onClick={() => { history.goBack(); }}/>
      </div>
      <div id='article_full_frame'>
          <div>
            <Row>
            {/* 유저프로필,작성일 */}
              <div id="article_profile_info">
                <div style={{ display: "flex", alignItems: "center", marginLeft: "5%" }}>
                  <div id="article_profile_frame">
                    <img
                      id="article_profile_prof_img"
                      src={!data.userPicture ? process.env.PUBLIC_URL + "/image/Profileimage.png" : data.userPicture}
                    />
                  </div>
                  <div id="article_username">
                    <p onClick={() => gotoProfile(data.userId)}>
                      {data.userId}
                    </p>
                  </div>
                </div>
                <div id="article_profile_date">
                  <h5 id='article_profile_date_num'>{data.regTime}</h5>
                </div>
              </div>
              
              {/* 카페이름 */}
              <div id="article_cafe_name">
                <a href="#" onClick={() => gotoCafeprofile(data.cafeName)}>
                  {data.cafeName}
                </a>
              </div>
            </Row>
          
          <Row id="article_frame_row">
              <div id='article_slider_frame'>
                <div class="slider">
                  {data &&
                    data.files &&
                    data.files.map((file, index) => (
                      <input type="radio" name="slide" id={`slide${index + 1}`} />
                    ))
                  }
                  <ul id="article_picture_frame" class="imgs">
                    {data &&
                      data.files &&
                      data.files.map((file, index) => (
                        <li>
                          <img id="article_picture" src={file.filePath} />
                        </li>
                      ))}
                  </ul>
                  <div class="bullets">
                    {data &&
                      data.files &&
                      data.files.map((file, index) => (
                        <label htmlFor={`slide${index + 1}`}>&nbsp;</label>
                      ))}
                  </div>
                </div>
            </div>
              
            </Row>
          
            <Row>
              {/* 본문내용, 카페관심사태그 */}
              <div id="article_body">
                {/* 본문 내용  */}
                <div id="article_content_frame">
                  <div>{data.content}</div>
                </div>
              </div>
            </Row>
            <Row id='article_heart_bookmark_cate'>
              <Col style={{alignSelf: "center"}}>
                  {/* 하트 & 북마크*/}
                  <div id="article_heart_bookmark_frame">
                    {likearr[1] ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/image/heart.png`}
                        id="article_heart"
                        onClick={likearticle}
                      />
                    ) : (
                      <img
                        src={`${process.env.PUBLIC_URL}/image/empty_heart.png`}
                        id="article_heart"
                        onClick={likearticle}
                      />
                    )}
                    <div
                      style={{
                        width: "50px",
                        textAlignLast: "center",
                        textAlignLast: "center",
                      }}
                    >
                      <p
                        id='article_heart_count'
                        onClick={() => setLikemodalshow(true)}
                      >
                        {likearr[[0]]}
                      </p>
                    </div>
                    {isbookmark ? (
                      <img
                        src={`${process.env.PUBLIC_URL}/image/bookmark.png`}
                        id="article_bookmark"
                        onClick={checkbookmark}
                      />
                    ) : (
                      <img
                        src={`${process.env.PUBLIC_URL}/image/empty_bookmark.png`}
                        id="article_bookmark"
                        onClick={checkbookmark}
                      />
                    )}
                    <div id='article_bookmark_count_frame'>
                      <p id='article_bookmark_count'>북마크</p>
                    </div>
                    {data.userId == props.user[0] && (
                      <><Button id='article_modify_button' onClick={() => setModifymodalshow(true)}>수정</Button>
                      <Button id='article_delete_button' onClick={() => deleteFeed(data.feedNo)}>삭제</Button></>
                    )}
                  </div>
                </Col>
                <Col>
                  {/* 관심사 카테고리 표시 폼 */}
                  <div id="article_category">
                    {data &&
                      data.categoryList &&
                      data.categoryList.map((category, index) => (
                        <p key={index} id="article_category_content" onClick={() => gotoCategory(category)}>{category}</p>
                      ))}
                  </div>
                </Col>
            </Row>
            <Row  id='article_comment_con' >
              <Col>
                <div>
                  <Comment user={props.user} />
                </div>
              </Col>
            </Row>
            
          </div>
        <Modifyarticle
          show={modifymodalshow}
          onHide={() => setModifymodalshow(false)}
          ref={childRef}
          data={data}
          user={props.user}
          pk={pk}
        />
        <Likelist
          show={likemodalshow}
          onHide={() => setLikemodalshow(false)}
          ref={likeRef}
        />
      </div>
    </>
  );
}
