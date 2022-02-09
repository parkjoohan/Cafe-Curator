import React,{useEffect,useState, useRef} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FiCornerUpLeft } from 'react-icons/fi';
import './css/Comment.css'
import axios from 'axios';

export default function Comment() {
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const [recomments, setRecomments] = useState([]); 
    const url = "http://i6c104.p.ssafy.io:8080/comment"
    const [parentNo, setParentNo] = useState([]);

    let {pk} = useParams();

    // 댓글 불러오기
    useEffect(() => {
        axios.get(url, {
        params: {
            "feedNo": `${pk}`,
            "size": 5,
            "userNo": "aa"
        }
        }).then((data1) => {
            console.log(data1.data);
            setComments(data1.data);
        }).catch((error) => {
            console.error(error)
        })
    }, []);

    // 댓글 불러오기
    function readComment() {
        axios.get(url, {
            params: {
                "feedNo": 60,
                "size": 5,
                "userNo": "aa"
            }
        }).then((data1) => {
            console.log(data1.data);
            setComments(data1.data);
        })
    }

    // //댓글 쓰기
    function writeComment(props) {
        console.log(props);
        axios.post("/comment", {
            "content": props,
            "feedNo": 60,
            "userNo": "aa",
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
                            "feedNo": 60,
                            "size": 5,
                            "userNo": "aa"
                        }
                    }).then((data1) => {
                        console.log(data1.data);
                        setComments(data1.data);
                    })
                }
        })
    }

    function replyRegister(commentNo) {
        console.log(commentNo);
        parentNo = commentNo;
        //this.$refs.rep.focus();
        console.log(parentNo);
    }

    // 대댓글 쓰기
    function writeRecomment(props) {
        console.log(props);
        console.log("parentNo " + parentNo);

        axios.post("/comment", {
            "content": props,
            "feedNo": 60,
            "parentNo": `${parentNo}`,
            "userNo": "aa",
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
                            "feedNo": 60,
                            "size": 5,
                            "userNo": "aa"
                        }
                    }).then((data1) => {
                        console.log(data1.data);
                        setComments(data1.data);
                    })
                }
        })
    }

    // 대댓글 불러오기
    function showRecomment(props) {
        console.log(props);
        
        axios.get(url + '/nested', {
            params: {
                "parentNo": props, 
                "size": 5,
                "userNo": "aa"
            }
        }).then((data3) => {
            console.log(data3.data);
            setRecomments([...recomments, ...data3.data]);
        }).catch(() => {
            console.log('불러오기 실패')
            // window.location.replace("/article/0")
        })
    };
    
    // 댓글 삭제
    function deleteComment(props) {
        console.log(props);
        axios.delete(url + `/a4/${props}`).then(window.location.reload())
    }

    return (
        <Container > 
            <div id='article_comment'>
                <p style={{ marginLeft: "-12%" }}>총 {comments.length}개의 댓글이 있습니다.</p>
                <div id='article_comment_frame'>
                    {/* 댓글 */}
                    <div id='article_comments-frame'>
                    {    
                        <div>   
                        {comments.map((comment) => (   
                            <Container>
                                <Row id='article_comments'>
                                    <Col lg={9}>
                                        <Row>
                                            <Col lg={1}>
                                                <h5 id='article_comments_user'>{comment.userId}</h5>
                                            </Col>
                                            <Col lg={11}>
                                                <h5 id='article_comments_content'>{comment.content}</h5>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={3}>
                                        <Row>
                                            <Col lg={7}>
                                                <h7 style={{fontSize: "12px"}} onClick={() => setParentNo(comment.commentNo)}>답글달기 </h7> 
                                            </Col>
                                            <Col lg={5}>
                                                <h7 style={{fontSize: "12px"}} onClick={() => deleteComment(comment.commentNo)}>삭제</h7>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <h7 id='article_commnets_more' onClick={() => showRecomment(comment.commentNo)}>더보기 </h7>
                                </Row>
                                
                                {/* 대댓글 */}
                                <div>
                                {
                                    recomments.map((recomment) =>
                                    comment.commentGroup == recomment.commentGroup && (
                                    // <div id='article_comments'>
                                    <>
                                        <Row id='article_recomments-frame'> 
                                            <Col>
                                                <Row>
                                                    <Col lg={1}>
                                                        <h5 id='article_comments_user'>{recomment.userId}</h5>
                                                    </Col>
                                                    <Col lg={8}>
                                                        <h5 id='article_comments_content'>{recomment.content}</h5>
                                                    </Col>
                                                    <Col lg={2}>
                                                        <h7 style={{fontSize: "12px"}} onClick={() => setParentNo(recomment.commentNo)}>답글달기 </h7>
                                                    </Col>
                                                    <Col lg={1}>
                                                        <h7 style={{fontSize: "12px"}} onClick={() => deleteComment(recomment.commentNo)}>삭제</h7>
                                                    </Col>
                                                </Row>
                                            </Col>     
                                        </Row>                
                                    </>
                                    
                                    ))/* </div>  */
                                }
                                </div>
                            </Container>
                        ))}
                        </div>  
                    }
                    </div> 
                </div>
                <div style={{marginLeft: "-14%"}}>
                    <Row style={{borderBottom: "1px solid black", width: "110%", marginLeft: "1%"}}>
                        <Col lg={2} style={{fontSize: "20px", marginTop: "1%"}}>
                            <strong>@{parentNo}</strong>
                        </Col>
                        <Col lg={10}>
                            <input 
                                type="text"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        writeComment(e.target.value);
                                        console.log(parentNo);
                                        if (parentNo != "") {
                                            writeRecomment(e.target.value, parentNo);
                                        }
                                    }
                                }}
                                style={{width: "100%", height: "40px", border: "none"}}
                            >
                            </input>
                        </Col>
                    </Row>
                </div>
            </div>
            
        </Container>
    )
}
