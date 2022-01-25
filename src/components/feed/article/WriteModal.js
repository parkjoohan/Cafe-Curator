import React,{useState,useEffect,useRef} from 'react';
import  { Modal } from 'react-bootstrap';
import {TextField, Button} from '@material-ui/core';
import { Row,Col } from 'react-bootstrap'
import './css/WriteModal.css'



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
        <Col lg={3} md={5} xs={10}>
          <div 
          className='likebutton' 
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
        <Col xs={2}>
          <div 
          className='selected' 
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

  const paperStyle = {
    padding: 20,
    height: "600px",
    width: 500,
    margin: "20px auto",
  }

  const avatarStyle = {
    background: "#1bbd7e",
  }

  const btnStyle = {
    margin: "8px, "
  }

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
      <Modal.Body>
        <TextField label="Cafe name" placeholder='카페 이름' fullWidth required/><br /><br/>

        <Row>
        </Row>

        <Row style={{justifyContent:"start"}}>
          {defaultlike}
        </Row>
        
        <br/><br/>
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
            <Row style={{justifyContent:"start"}}>
              {selected}
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="contained">작성</Button>
      </Modal.Footer>
    </Modal>
  )
}
export default WriteModal