import React,{useEffect,useState, useRef} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FiCornerUpLeft } from 'react-icons/fi';
import './css/Comment.css'
import axios from 'axios';
import $ from "jquery";

export default function Comment({ user }) {
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const [recomments, setRecomments] = useState([]);
    const url = "http://i6c104.p.ssafy.io:8080/comment"
    const [parentNo, setParentNo] = useState([]);
    const [parentNo2, setParentNo2] = useState([]);
    const [commentNo, setCommentNo] = useState([]);
    const [heart, setHeart] = useState();
    const [like, setLike] = useState([]);
    const [mylike, setMyLike] = useState([]);
    const [showMore, setShowMore] = useState(true);

    let { pk } = useParams();
    

    // 댓글 불러오기
    useEffect(() => {
        axios.get(url + `/${pk}/${user[1]}`)
            .then((data1) => {
            console.log(data1.data);
            if (data1.data != "댓글이 존재하지 않습니다.")
                setComments(data1.data);
            let newArray = new Array(data1.data.length)
            let newArray2 = new Array(data1.data.length)
            for (let i = 0; i < newArray.length; i++) {
                newArray[i] = data1.data[i].likeCount;
                newArray2[i] = data1.data[i].checkLike;
            }
            setLike(newArray);
            setMyLike(newArray2);
        }).then((error) => {
            // console.error(error) 댓글 없을 떄 수행되는 코드 작성하기
        })
    }, []);

    
    // 대댓글 불러오기
    useEffect(() => {
        axios.get(url + '/nested', {
            params: {
                "parentNo": parentNo2,
                "size": 100,
                "userNo": `${user[1]}`,
            }
        }).then((data3) => {
            console.log(data3.data);
            setRecomments([...recomments, ...data3.data]);
        })
    }, []);
    
    // //댓글 쓰기
    function writeComment(props) {
        console.log(props);
        axios.post("/comment", {
            "content": props,
            "feedNo": `${pk}`,
            "userNo": `${user[1]}`
            // "parentNo": 
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
            }).then((data2) => {
                if (data2.data == "success") {
                    console.log(data2.data);
                    axios.get(url, {
                        params: {
                            "feedNo": `${pk}`,
                            "size": 100,
                            "userNo": `${user[1]}`
                        }
                    }).then((data1) => {
                        console.log(data1.data);
                        setComments(data1.data);
                    })
                }
        })
    }

    // 대댓글 쓰기
    function writeRecomment(props) {
        console.log(props);
        console.log("parentNo " + parentNo);

        axios.post("/comment", {
            "content": props,
            "feedNo": `${pk}`,
            "parentNo": parentNo,
            "userNo": `${user[1]}`
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
            }).then((data2) => {
                console.log(data2);
                if (data2.data == "success") {
                    console.log(data2.data);
                    axios.get(url, {
                        params: {
                            "feedNo": `${pk}`,
                            "size": 100,
                            "userNo": `${user[1]}`
                        }
                    }).then((data1) => {
                        console.log(data1.data);
                        setComments(data1.data);
                    })
                }
        })
    }

    // 댓글 삭제
    function deleteComment(props) {
        console.log(props);
        axios.delete(url + `/${user[1]}/${props}`).then(window.location.reload())
    }

    // 좋아요
    function likeArticle(props, index) {
        console.log(props);
        axios.get(url + `/like/${user[1]}/${props}`)
            .then((data) => {
                if (mylike[index] == true) {
                    let newArray3 = [...mylike];
                    newArray3[index] = false;
                    setMyLike(newArray3);
                    let newArray5 = [...like];
                    newArray5[index]--;
                    setLike(newArray5);
                } else {
                    let newArray4 = [...mylike];
                    newArray4[index] = true;
                    setMyLike(newArray4);
                    let newArray6 = [...like];
                    newArray6[index]++;
                    setLike(newArray6);
                }
                console.log(data.data);
            })
    }

    return (
        <Container > 
            <div id='article_comment'>
                <p style={{ marginLeft: "-6%" }}>총 <strong style={{fontSize:"20px"}}>{comments.length}</strong>개의 댓글이 있습니다.</p>
                <div id='article_comment_frame'>
                    {/* 댓글 */}
                    <div>
                    {    
                        <div>   
                            {comments.map((comment, index) => (

                                <Container>
                                    {
                                        comment.sequence == 0 ? 
                                        (<Row id='article_comments'>
                                                <Col lg={10} style={{ width: "500px" }}>
                                                    <Row>
                                                        <Col lg={2} style={{ alignSelf: "center", width: "110px" }}>
                                                            <h5 style={{ fontSize: "20px"}} id='article_comments_user'>{comment.userId}</h5>
                                                        </Col>

                                                        <Col lg={10} style={{ alignSelf: "center", width: "390px" }}>
                                                            <h5 id='article_comments_content'>{comment.content}</h5>
                                                        </Col>
                                                    </Row>
                                                </Col>        
                                                <Col lg={2} style={{ width: "200px" }}>
                                                    <Row>
                                                        <Col lg={5} style={{ width: "84px" }}>
                                                            <h5 style={{ fontSize: "15px"}} onClick={() => setParentNo(comment.commentNo)}>답글달기 </h5>
                                                        </Col>

                                                        <Col lg={3} style={{ width: "54px" }}>
                                                            <h5 style={{ fontSize: "15px"}} onClick={() => deleteComment(comment.commentNo)}>삭제</h5>
                                                        </Col>
                                                        
                                                        <Col lg={2} style={{ width: "10px" }}>
                                                            {/* <h5 style={{ fontSize: "12px" }} onClick={() => likeArticle(recomment.commentNo)}> */}
                                                            <h5 style={{ fontSize: "15px"}} >
                                                                {mylike[index] == true ? <img
                                                                    style={{ width: "15px" }}
                                                                    onClick={() => likeArticle(comment.commentNo, index)}
                                                                    src="/image/heart.png"
                                                                /> : <img
                                                                    style={{ width: "15px" }}
                                                                    onClick={() => likeArticle(comment.commentNo, index)}
                                                                    src="/image/empty_heart.png"
                                                                />}
                                                            </h5>
                                                        </Col>
                                                        <Col lg={2}>
                                                            <p style={{ fontSize: "15px"}} >{like[index]}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                        </Row>) :  
                                        (<Row id='article_comments'>
                                                <Col lg={10} style={{ width: "465px", marginLeft: "5%" }}>
                                                    <Row>
                                                        <Col lg={2} style={{ alignSelf: "center", width: "110px" }}>
                                                            <h5 style={{ fontSize: "20px"}} id='article_comments_user'>{comment.userId}</h5>
                                                        </Col>

                                                        <Col lg={10} style={{ alignSelf: "center", width: "300px" }}>
                                                            <h5 id='article_comments_content'>{comment.content}</h5>
                                                        </Col>
                                                    </Row>
                                                </Col>        
                                                <Col lg={2} style={{ width: "200px" }}>
                                                    <Row>
                                                        <Col lg={5} style={{ width: "84px" }}>
                                                            <h5 style={{ fontSize: "15px"}} onClick={() => setParentNo(comment.commentNo)}>답글달기 </h5>
                                                        </Col>

                                                        <Col lg={3} style={{ width: "54px" }}>
                                                            <h5 style={{ fontSize: "15px"}} onClick={() => deleteComment(comment.commentNo)}>삭제</h5>
                                                        </Col>
                                                        
                                                        <Col lg={2} style={{ width: "10px" }}>
                                                            {/* <h5 style={{ fontSize: "12px" }} onClick={() => likeArticle(recomment.commentNo)}> */}
                                                            <h5 style={{ fontSize: "15px"}} >
                                                                {mylike[index] == true ? <img
                                                                    style={{ width: "15px" }}
                                                                    onClick={() => likeArticle(comment.commentNo, index)}
                                                                    src="/image/heart.png"
                                                                /> : <img
                                                                    style={{ width: "15px" }}
                                                                    onClick={() => likeArticle(comment.commentNo, index)}
                                                                    src="/image/empty_heart.png"
                                                                />}
                                                            </h5>
                                                        </Col>
                                                        <Col lg={2}>
                                                            <p style={{ fontSize: "15px"}} >{like[index]}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                        </Row>)    
                                    }
                                        
                                    
                                </Container>
                                
                            ))}
                        </div>  
                    }
                    </div> 
                </div>
                <div style={{marginLeft: "-8%"}}>
                    <Row style={{borderBottom: "1px solid black", width: "112%", marginLeft: "1.5%"}}>
                        <Col lg={2} style={{fontSize: "20px", marginTop: "1%"}}>
                            <strong>@{parentNo}</strong>
                        </Col>
                        <Col lg={10}>
                            <input 
                                type="text"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        console.log(parentNo);
                                        // if (parentNo != "") {
                                        //     writeRecomment(e.target.value);
                                        // } else {
                                            writeComment(e.target.value);
                                        // }
                                    }
                                }}
                                style={{width: "100%", height: "40px", border: "none", background: "lavender"}}
                            >
                            </input>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    )
}
