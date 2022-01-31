import React,{useState,useEffect,useRef} from 'react';
import  { Modal } from 'react-bootstrap';
import {TextField, Button} from '@material-ui/core';
import { Row,Col } from 'react-bootstrap'
import './css/WriteModal.css'
import Search from './Search';



const WriteModal = ( {show, onHide}) => {

  const [like,setlike] = useState([
    [0,false],
    [1,false],
    [2,false],
    [3,false],
  ])

  let likename = ['관심사1','관심사2','관심사3','관심사4'];

  const selectlike = (n) => {
    const newlike = [...like];
    newlike[n][1] = true;
    setlike(newlike);
  }

  const unlike = (n) => {
    const newlike = [...like];
    newlike[n][1] = false;
    setlike(newlike);
  }

  const [fileImage, setFileImage] = useState([])

  const photoInput = useRef();

  const handleClick = ()=>{
    if(fileImage.length>=4){
      alert("사진은 최대 4장까지 가능합니다.")
    } else{
      photoInput.current.click();
    }
  };

  const onLoadFile = e => {
    console.log('업로드!!')
    const newfilearr = fileImage;
    setFileImage([...fileImage,
      URL.createObjectURL(e.target.files[0])])
  }

  function deletePicture(e){
    const newfilearr = [...fileImage];
    newfilearr.splice(e,1);
    setFileImage(newfilearr);
  }

  const defaultlike = like.map((num)=>(
    <>
      {num[1]==false?
        <Col lg={2} md={5} xs={10}>
          <div 
          className='writemodal_likebutton' 
          id={num[0]}
          onClick={()=>selectlike(num[0])}
          >{likename[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  const selected = like.map((num)=>(
    <>
      {num[1]==true?
        <Col lg={2} md={5} xs={10}>
          <div 
          className='writemodal_selected' 
          id={num[0]}
          onClick={()=>unlike(num[0])}
          >{likename[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  
    
  // function addlike(e){
  //   const newselectlike = [...selectlike,e];
  //   setSelectlike(newselectlike)
  //   viewlike();
  // }

  // function viewlike(){
  //   return (
  //     <>
  //       {
  //         selectlike.map((select,index)=>(
  //           <div id={select} key={select}>
  //             {like.select}
  //           </div>
  //         ))
  //       }
  //     </>
  //   )
  // }

  function pictures(){
    console.log('사진 올라간다!or 삭제했다.!')
    return (
      <>
      {
        fileImage.map((url,index)=>(
          <img
          key={index} 
          src={url}
          style={{width:"7%",height:"auto",borderStyle:"groove"}}
          onClick={()=>deletePicture(index)}/>
        ))
      }
      </>
    )
  }

  useEffect(()=>{
    console.log('useeffect done!')
    pictures();
  },[fileImage])


  return (
    <Modal
      size='xl'
      show = {show}
      onHide = {onHide}
    >
      <div id="navcolor"></div>
      <Modal.Header>
      <h3 id="writemodal_Margin_Underline">게시물 작성</h3>
      </Modal.Header>

      <Modal.Body>
        {/* 카페 검색 창 */}
        <Search />
        {/* 카페 이름 출력창 */}
        <TextField label="Cafe name" placeholder='카페 이름' fullWidth required/><br /><br/>

        {/* 관심사 선택 */}
        
        <div id='writemodal_cate'>
          <Row>
            {/* 선택된 카테고리 */}
            <Col md={3}>
              <p id='selected_cate'>선택된 카테고리</p>
            </Col>
            <Col md={9}>
              <Row>{selected}</Row>
            </Col>
          </Row>

          <hr />

          <Row style={{ justifyContent: "start" }}>
            <Row>{defaultlike}</Row>
          </Row>
        </div>

        {/* 사진 선택 */}
        <Row>
          <Col lg={5} md={7}>
            <div className='pictureinput'>
              <p>이전</p>
              <div 
              style={{width:"50%", 
              paddingBottom:"50%", 
              borderStyle:"groove",
              position:"ralative"}}
              onClick={handleClick}>
                <input
                type="file"
                style={{display:"none"}}
                ref={photoInput}
                onChange={onLoadFile}
                ></input>
              </div>
              <p>이후</p>
            </div>
            <div className='minipicture'>
              {pictures()}
            </div>
            <div style={{textAlign:"center"}}>사진은 최대 4장까지 첨부가 가능합니다.</div>
          </Col>
          <Col lg={5} md={7}>
            <TextField
                  id="outlined-multiline-flexible"
                  label="Review"
                  multiline
                  minRows={2}
                  margin='dense'
                  fullWidth required
            ></TextField>
            
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button id="writemodal_NoBgButton" onClick={onHide}>작성</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default WriteModal