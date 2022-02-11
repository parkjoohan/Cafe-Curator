import React,{useState,useEffect,useRef, useImperativeHandle, forwardRef} from 'react';
import  { Container, Modal } from 'react-bootstrap';
import {TextField, Button} from '@material-ui/core';
import { Row,Col } from 'react-bootstrap'
import Search from './Search';
import axios from 'axios'



const Modifyarticle = forwardRef(({show, onHide, data},ref) => {

  useImperativeHandle(ref,()=>({
    setDetaildata,
  }))

  const [detaildata,setDetaildata] = useState({});
  
  const [form,setForm] = useState({
    "feedDto":{}
  })

  const [files,setFiles] = useState([])

  const [cafeinfo,setCafeinfo] = useState({})

  const [content,setContent] = useState("")

  const [cnt,setCnt] = useState(0);
  
  const [like,setlike] = useState([
    [0,false],
    [1,false],
    [2,false],
    [3,false],
    [4,false],
  ])

  const [defaultfile, setDefaultfile] = useState([]);

  const [defaultcafe,setDefaultcafe] = useState("")

  const [deletedefaultfile,setDeletedefaultfile] = useState([])

  let likename = ['커피','케이크','마카롱/쿠키','브런치','차'];

  const selectlike = (n) => {
    if(cnt==3){
      alert('관심사는 최대 3개까지 선택 가능합니다.')
    }else{
    const newlike = [...like];
    newlike[n][1] = true;
    setlike(newlike);
    setCnt(prev=>prev+1);
    }
  }

  const unlike = (n) => {
    const newlike = [...like];
    newlike[n][1] = false;
    setlike(newlike);
    setCnt(prev=>prev-1);
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
    // console.log('업로드!!')
    const newfilearr = fileImage;
    setFileImage([...fileImage,
      URL.createObjectURL(e.target.files[0])])
    setFiles([...files, e.target.files[0]])
  }

  function deletePicture(e){

    let newdeletedefaultfile = [...deletedefaultfile]
    for (let i = 0; i < defaultfile.length; i++) {
      if(defaultfile[i][1]==fileImage[e]){
        newdeletedefaultfile = newdeletedefaultfile.concat([defaultfile[i][0]])
        break
      }
    }
    setDeletedefaultfile(newdeletedefaultfile);

    const newfilearr = [...fileImage];
    newfilearr.splice(e,1);
    setFileImage(newfilearr);
  }

  const defaultlike = like.map((num)=>(
    <>
      {num[1]==false?
        <Col lg={5} md={5} xs={10}>
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

  const [like2,setlike2] = useState([
    [0,false],
    [1,false],
    [2,false],
    [3,false],
    [4,false],
  ])

  let likename2 = ['사진찍기 좋은','아늑한','힙한','공부하기 좋은', '테마있는'];

  const selectlike2 = (n) => {
    if(cnt==3){
      alert('관심사는 최대 3개까지 선택 가능합니다.')
    }else{
    const newlike = [...like2];
    newlike[n][1] = true;
    setlike2(newlike);
    setCnt(prev=>prev+1);
    }
  }

  const unlike2 = (n) => {
    const newlike = [...like2];
    newlike[n][1] = false;
    setlike2(newlike);
    setCnt(prev=>prev-1);
  }

  const defaultlike2 = like2.map((num)=>(
    <>
      {num[1]==false?
        <Col lg={5} md={5} xs={10}>
          <div 
          className='writemodal_likebutton' 
          id={num[0]}
          onClick={()=>selectlike2(num[0])}
          >{likename2[num[0]]}</div>
        </Col>
        :
        <></>
      }
    </>
  ))

  const selected2 = like2.map((num)=>(
    <>
      {num[1]==true?
        <Col lg={3} md={5} xs={10}>
          <div 
          className='writemodal_likebutton' 
          id={num[0]}
          onClick={()=>unlike2(num[0])}
          >{likename2[num[0]]}</div>
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
    // console.log('사진 올라간다!or 삭제했다.!')
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
    // console.log('useeffect done!')
    pictures();
  },[fileImage])

  useEffect(()=>{

    // console.log('함수호출성공!',detaildata)
    try{
    // console.log(detaildata.cafeName)
    setDefaultcafe(detaildata.cafeName);
    // console.log('ㅇㅇ1')
    let newdefaultfilearr = new Array(detaildata.files.length)
    for (let i = 0; i < detaildata.files.length; i++) {
      newdefaultfilearr[i] = [detaildata.files[i].fileNo,detaildata.files[i].filePath]
    }
    setDefaultfile(newdefaultfilearr);
    // console.log('ㅇㅇ2')
    setCnt(detaildata.categoryList.length);
    // console.log('ㅇㅇ3')
    setContent(detaildata.content);
    // console.log('ㅇㅇ4')
    // console.log(detaildata.categoryList)
    let newlikearr = [...like];
    let newlikearr2 = [...like2];
    for (let i = 0; i < likename.length; i++) {
      if (detaildata.categoryList.includes(likename[i])){
        // console.log('true?')
        newlikearr[i] = [i,true]
      }
    }
    setlike(newlikearr)
    for (let i = 0; i < likename2.length; i++) {
      if (detaildata.categoryList.includes(likename2[i])){
        // console.log('true?')
        newlikearr2[i] = [i,true]
      }
    }
    setlike2(newlikearr2)

    let newfileImage = new Array(detaildata.files.length)
    for (let i = 0; i < detaildata.files.length; i++) {
      let src = detaildata.files[i].filePath;
      newfileImage[i] = src;
    }
    setFileImage(newfileImage)

    }catch{
      console.log('errorㅜㅜ')
    }
  },[detaildata])

  useEffect(()=>{
    // console.log(like,like2)
  },[like,like2])

  useEffect(()=>{
    // console.log(defaultcafe)
  },[defaultcafe])

  useEffect(()=>{
    // console.log(cafeinfo)
    // console.log(defaultcafe)
  },[cafeinfo])

  const write = () => {
    let modifyDto = {
      feedNo:detaildata.feedNo,
      content:content,
      cafeName:null,
      cafeAddress:null,
      cafeX:null,
      cafeY:null,
      categoryList:[],
      deletedFileList:deletedefaultfile,
      cafeModified:null,
    }
    for (let i = 0; i < like.length; i++) {
      if(like[i][1]===true){
        modifyDto.categoryList = [...modifyDto.categoryList,likename[i]]
      }
      if(like2[i][1]===true){
        modifyDto.categoryList = [...modifyDto.categoryList,likename2[i]]
      }
    }
    if(cafeinfo.cafeName==null){
      modifyDto.cafeModified = false;
    }else{
      modifyDto.cafeModified = true;
      modifyDto.cafeName = cafeinfo.cafeName;
      modifyDto.cafeX = cafeinfo.cafeX;
      modifyDto.cafeY = cafeinfo.cafeY;
      modifyDto.cafeAddress = cafeinfo.cafeAddress;
    }
    console.log('수정 dto',modifyDto)
    console.log(files)
    const newForm = new FormData();
    newForm.append("feedDto", new Blob([JSON.stringify(modifyDto)], { type: "application/json" }))
    for (let i = 0; i < files.length; i++) {
      newForm.append("files",files[i])
    }
    const modifyurl = `http://i6c104.p.ssafy.io:8080/feed/a1/`
    axios({
      method: "put",
      url: modifyurl,
      data: newForm,
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res=>console.log('응답받았다',res)).catch(err=>console.log('실패했다',err))
    onHide()
  }


  return (
    <Modal
      size='xl'
      show = {show}
      onHide = {onHide}
    >
      <div id="writemodal_navcolor"></div>
      <Modal.Header>
      <h3 id="writemodal_Margin_Underline">게시물 수정</h3>
      </Modal.Header>

      <Modal.Body>
        {/* 카페 검색 창 */}
        <h3>{form.formDto && form.formDto.place_name}</h3>
        <Search setCafeinfo={setCafeinfo}/>
        {/* 카페 이름 출력창 */}
        {/* <TextField label="Cafe name" placeholder='카페 이름' fullWidth required/> */}

        {/* 관심사 선택 */}
        <Container id='writemodal_cate'>
          <div>
            <Row>
              {/* 선택된 카테고리 */}
              <Col md={3}>
                <p id='writemodal_selected_cate'>선택된 카테고리</p>
              </Col>
              <Col md={9}>
              <Row>{selected}{selected2}</Row>
              </Col>
            </Row>

            <hr />

            <Row id='writemodal_cate_select'>
              <Col id='writemodal_cate_air' md={6}>
                {/* 분위기 카테고리 */}
                <p style={{fontWeight: "bold"}}>분위기 카테고리</p>
                <Row>{defaultlike2}</Row>
              </Col>
              <Col id='writemodal_cate_menu' md={6}>
                {/* 메뉴 카테고리 */}
                <p style={{fontWeight: "bold"}}>메뉴 카테고리</p>
                <Row>{defaultlike}</Row>
              </Col>
            </Row>
          </div>
        </Container>

        {/* 사진 선택 */}
        <Row>
          <Col lg={5} md={7}>
            <div id='writemodal_pictureinput'>
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
            <div id='minipicture'>
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
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
            ></TextField>
            
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button id="writemodal_NoBgButton" onClick={()=>write()}>작성</Button>
      </Modal.Footer>
    </Modal>
  )
})
export default Modifyarticle