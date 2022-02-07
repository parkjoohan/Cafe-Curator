import React,{useEffect,useState} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FiCornerUpLeft } from 'react-icons/fi';
import './css/Comment.css'
import axios from 'axios';

export default function Comment() {
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const [recomments, setRecomments] = useState([]); 
    const url = "http://localhost:8080/comment"

    // 댓글 불러오기
    useEffect(() => {
        axios.get(url, {
        params: {
            "feedNo": 40,
            "size": 5,
            "userNo": "aa"
        }
        }).then((data1) => {
            console.log(data1.data);
            setComments([...comments, ...data1.data]);
        }).catch(() => {
            console.log('불러오기 실패')
        })
    }, []);

    // //댓글 쓰기
    // useEffect(() => {
    //     if(comments == "1") {
    //     axios.post("/comment", {
    //         "content": comments.content,
    //         "feedNo": 40,
    //         "userNo": "a3"
    //     },
    //     {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //         }).then((data2) => {
    //         console.log(data2.data);
    //     })}
    // }, [comments])

    // 대댓글 불러오기
    function showRecomment(props) {
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
        })
    };
    
    return (
        <Container > 
            <div id='article_comment'>
                <p>총 {comments.length}개의 댓글이 있습니다.</p>
                <div id='article_comment_frame'>
                    {/* 댓글 */}
                    <div id='article_comments-frame'>
                    {    
                        <div>   
                        {comments.map((comment) => (   
                            <div>
                                <div id='article_comments'>
                                    <h5 id='article_comments_user'>{comment.userId}</h5>
                                    <h5 id='article_comments_content'>{comment.content}</h5>
                                    <button onClick={() => showRecomment(comment.commentNo)} commentNo={comment.commentNo}>더보기</button>    
                                    <button onClick={() =>
                                    axios.delete(url + `/a4/${comment.commentNo}`).then(window.location.reload())
                                    }>삭제
                                    </button>
                                </div>
                                {/* 대댓글 */}
                                <div id='article_recomments-frame'>             
                                    {recomments.map((recomment) => (
                                        <div id='article_comments'>
                                        <h5 id='article_comments_user'>{recomment.userId}</h5>
                                        <h5 id='article_comments_content'>{recomment.content}</h5>
                                        </div> 
                                    ))}
                                </div> 
                            </div>
                        ))}
                        </div>  
                    }
                    </div> 
                </div>
            </div>
        </Container>
    )
}