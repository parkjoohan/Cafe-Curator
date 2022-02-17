/*global kakao*/
import "./css/Blog.css";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import Blog from "./Blog";
import { useHistory } from "react-router-dom";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const Blogs = (props, ref) => {
  const history = useHistory();
  const [likebookmarkarr, setLikebookmarkarr] = useState([]);

  useEffect(() => {
    let newlikebookmarkarr = new Array(props.data.length);
    for (let i = 0; i < props.data.length; i++) {
      newlikebookmarkarr[i] = [
        props.data[i].liked,
        props.data[i].likeCount,
        props.data[i].marked,
      ];
    }
    setLikebookmarkarr(newlikebookmarkarr);
  }, [props.data]);
  const gotoUserprofile = (id) => {
    history.push(`profile/${id}`);
  };
  const gotoDetail = (pk) => {
    history.push(`article/${pk}`);
  };

  const bookmarkarticle = (i) => {
    const url = `http://i6c104.p.ssafy.io:8080/feed/bookmark/${props.data[i].feedNo}/${props.user[1]}`;
    axios.get(url).then((res) => {
      let bookmark = document.getElementById(`bookmark${i}`);
      let emptybookmark = document.getElementById(`emptybookmark${i}`);
      if (res.data == "SUCCESS : ADD BOOKMARK") {
        bookmark.style.display = "block";
        emptybookmark.style.display = "none";
      } else {
        bookmark.style.display = "none";
        emptybookmark.style.display = "block";
      }
    });
  };

  const likearticle = (i) => {
    console.log(i, props.data[i]);
    const url = `http://i6c104.p.ssafy.io:8080/feed/like/${props.data[i].feedNo}/${props.user[1]}`;
    console.log(url);

    axios.get(url).then((res) => {
      let heart = document.getElementById(`heart${i}`);
      let emptyheart = document.getElementById(`emptyheart${i}`);
      let likecountbox = document.getElementById(`likecount${i}`);
      let newarr = [...likebookmarkarr];
      let newarr2 = [...likebookmarkarr[i]];
      if (likebookmarkarr[i][0] == false) {
        if (res.data == "SUCCESS : ADD LIKE") {
          heart.style.display = "block";
          emptyheart.style.display = "none";
          newarr2[1] = newarr2[1] + 1;
          likecountbox.innerHTML = `${newarr2[1]}`;
        } else {
          heart.style.display = "none";
          emptyheart.style.display = "block";
          likecountbox.innerHTML = `${newarr2[1]}`;
        }
      } else {
        if (res.data == "SUCCESS : ADD LIKE") {
          heart.style.display = "block";
          emptyheart.style.display = "none";
          likecountbox.innerHTML = `${newarr2[1]}`;
        } else {
          heart.style.display = "none";
          emptyheart.style.display = "block";
          newarr2[1] = newarr2[1] - 1;
          likecountbox.innerHTML = `${newarr2[1]}`;
        }
      }

      newarr[i] = newarr2;
      setLikebookmarkarr(newarr);
    });
  };

  useEffect(() => {
    console.log(likebookmarkarr);
    for (let i = 0; i < likebookmarkarr.length; i++) {
      let likebox = document.getElementById(`blogs_likebox${i}`);
      if (likebox.hasChildNodes()) {
        continue;
      }
      var heart = new Image();
      heart.src = `${process.env.PUBLIC_URL}/image/heart.png`;
      heart.id = `heart${i}`;
      heart.style.width = "15%";
      heart.addEventListener("click", () => likearticle(i));

      var emptyheart = new Image();
      emptyheart.src = `${process.env.PUBLIC_URL}/image/empty_heart.png`;
      emptyheart.id = `emptyheart${i}`;
      emptyheart.style.width = "15%";
      emptyheart.addEventListener("click", () => likearticle(i));

      var bookmark = new Image();
      bookmark.src = `${process.env.PUBLIC_URL}/image/bookmark.png`;
      bookmark.id = `bookmark${i}`;
      bookmark.style.width = "15%";
      bookmark.addEventListener("click", () => bookmarkarticle(i));

      var emptybookmark = new Image();
      emptybookmark.src = `${process.env.PUBLIC_URL}/image/empty_bookmark.png`;
      emptybookmark.id = `emptybookmark${i}`;
      emptybookmark.style.width = "15%";
      emptybookmark.addEventListener("click", () => bookmarkarticle(i));

      var likecountdiv = document.createElement(`div`);
      likecountdiv.id = `likecount${i}`;
      likecountdiv.innerHTML = `${likebookmarkarr[i][1]}`;
      likecountdiv.style.verticalAlign = "middle";
      likecountdiv.style.display = "inline";

      if (likebookmarkarr[i][0] == true) {
        heart.style.display = "block";
        emptyheart.style.display = "none";
      } else {
        heart.style.display = "none";
        emptyheart.style.display = "block";
      }

      if (likebookmarkarr[i][2] == true) {
        bookmark.style.display = "block";
        emptybookmark.style.display = "none";
      } else {
        bookmark.style.display = "none";
        emptybookmark.style.display = "block";
      }

      likebox.appendChild(heart);
      likebox.appendChild(emptyheart);
      likebox.appendChild(likecountdiv);
      likebox.appendChild(bookmark);
      likebox.appendChild(emptybookmark);
    }
  }, [likebookmarkarr]);

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
    <div>
      {props.isLoading
        ? new Array(10).fill(1).map((_, i) => {
            return <Blog key={i} />;
          })
        : props.data.map((item, index) => {
            return (
              <li key={item.id} id="blogs_item">
                <Col style={{ marginLeft: "3%", marginTop: "2%" }}>
                  <div style={{ marginBottom: "35%" }}>
                    {item.userPicture != null ? (
                      <img id="blogs_img2" src={item.userPicture} alt="" />
                    ) : (
                      <img id="blogs_img2" src="../image/Profileimage.png" />
                    )}
                    <strong
                      id="blogs_userId"
                      onClick={() => gotoUserprofile(item.userId)}
                    >
                      {item.userId}
                    </strong>
                  </div>
                  <div
                    id={`blogs_likebox${index}`}
                    style={{
                      marginBottom: "5%",
                      position: "relative",
                      display: "flex",
                    }}
                  >
                    {/* {likebookmarkarr[index][0] == true ? (
                      <img src="../image/heart.png" id="blogs_heart"></img>
                    ) : (
                      <img
                        src="../image/empty_heart.png"
                        id="blogs_heart"
                      ></img>
                    )} */}
                    {/* <strong id="blogs_heart_count">{item.likeCount}</strong> */}
                  </div>
                </Col>

                <Col className="blogs_detail">
                  <div id="blogs_detail_form">
                    <strong id="blogs_cafeName" onClick={()=>gotoCafeprofile(item.cafeName)}>{item.cafeName}</strong>
                  </div>
                </Col>

                <Col style={{ width: "50px", height: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      paddingTop: "3%",
                      paddingBottom: "3%",
                    }}
                  >
                    <img
                      id="blogs_img3"
                      src={item.file.filePath}
                      onClick={() => gotoDetail(item.feedNo)}
                    />
                  </div>
                </Col>
              </li>
            );
          })}
    </div>
  );
};

export default Blogs;
