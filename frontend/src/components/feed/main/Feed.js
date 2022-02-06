import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Map from './Map'


export default function Feed(props) {
  // 서버에서 받아올 데이터 중 이미지의 url이 저장됨 Array
  const [url_arr,setUrl] = useState([
    // "/test/1.1.png",// => 3:3
    // "/test/3.2.png",// => 4:3
    // "/test/4.3.png",// => 4:3
    // "/test/4.3(2).png",// => 4:3
    // "/test/5.3.png",// => 5:3
    // "/test/5.4.png",//0.8 => 4:3
    // "/test/16.9.png",// => 5:3
    // "/test/16.10.png",//0.625 => 5:3
    // "/test/16.11.png",//0.6875 => 4:3
    // "/test/17.10.png",//0.588 => 5:3
    // "/test/1.1.png",// => 3:3
    // "/test/3.2.png",// => 4:3
    // "/test/4.3.png",// => 4:3
    // "/test/4.3(2).png",// => 4:3
  ])

  const [like, setLike] = useState([]);


  // 이미지 프리로드가 완료됐는가? boolean
  const [isload,setload] = useState(false);

  // 이미지 프리로드를 해야할 숫자(url_arr.length)만큼 진행했는가? int
  const [cnt,setCnt] = useState(0);

  // 프리로드한 이미지를 state에 저장 Array
  const [images, setImages] = useState([]);

  // 이미지를 가로 몇줄로 쌓을것인가? int
  const [rows, setRows] = useState(0)

  // 이미지가 쌓일 컨테이너 px너비(window resize할때마다 바뀌므로) int
  const [containerWidth,setContainerWidth] = useState(0)

  // 각 줄 이미지가쌓인 높이 배열 Array
  let heightArr = [0]

  //이미지를 클릭하면 해당 디테일로 갈 수 있게.
  const history = useHistory();

  //url_arr생성,업데이트시 이미지 preload
  useEffect(() => {
    if (url_arr) {

      let newLikearr = new Array(url_arr.length)

      for (let i = 0; i < newLikearr.length; i++) {
        newLikearr[i] = url_arr[i].liked
      }

      setLike(newLikearr)

      setload(false);

    // console.log('url_arr생성!')
      console.log(url_arr)

    //생성,새로업데이트 된 이미지가 들어갈 배열길이 추가.
    //cnt부터하는 이유는. 무한스크롤이라고 가정했을 시,
    //지금까지 로드된 이미지 수가 cnt이기 때문.
    let newimages = new Array(url_arr.length-cnt);
    for (let i = cnt; i < url_arr.length; i++) {
      newimages[i]=""
    }
    setImages([...images,newimages])


    for (let i = 0; i < url_arr.length; i++) {
      const image = new Image();
      image.onload = ()=>imageupload(image,i);
      image.src = url_arr[i].file.filePath
    }
    }
    
  },[url_arr]);

  //이미지낱개 로드시 콜백함수
  function imageupload(image,i){
    // console.log("이미지 업로드됐다!",i)
    setCnt(prev=>(prev+1));
    //업로드된 이미지를 저장.
    let newimages = images;
    newimages[i] = image;
    // console.log(newimages,newimages.length)
    setImages(newimages)
  }

  //이미지낱개 로드 성공한 수가 url_arr길이하고 같은가?
  useEffect(()=>{
    // console.log(cnt)
    if (cnt == url_arr.length && url_arr.length != 0) {
      //프리로드 전부 완료!
      setload(true);
      // console.log("url 전부 로드 완료!")
    }
  },[cnt]);


  //리사이즈 될때 이벤트 추가.
  useEffect(()=>{
    // console.log('이게 가장 먼저 실행되겠지?')
    let container = document.getElementById("feedcontainer");
    setContainerWidth(container.offsetWidth);
    setRows(parseInt(container.offsetWidth/300))
    window.addEventListener('resize',handleResize);
    props.setFootershow(false)

    const data = {
      "size":20,
      "type":"feed",
      "lastFeedNo":100,
    }

    const url = "http://localhost:8080/feed/mainFeedList"

    axios.get(url,{
      params:{
        "size":10,
        "type":"feed",
        "lastFeedNo":100
      }
    }).then(function(res){
      console.log(res.data,'사고다')
      setUrl(res.data)
    }).catch(console.log("DD"))

    return ()=>{
      window.removeEventListener('resize',handleResize);
      props.setFootershow(true)
    }
  },[])

  //리사이즈될때, 실행되는 콜백함수
  const handleResize = () => {
    let container = document.getElementById("feedcontainer");
    setContainerWidth(container.offsetWidth);
    setRows(parseInt(container.offsetWidth/300))
  }

  //Container너비가 바뀌었다! 그럼이제이미지를 쌓아야됨.
  useEffect(()=>{
    //row가 바뀌었을시, 높이배열은 초기화해야한다. 다시 쌓아야하니까,
    let newheightArr = new Array(rows);
    for (let i = 0; i < newheightArr.length; i++) {
      newheightArr[i]=0;
    }
    heightArr = newheightArr;
    // console.log('다시하는거 맞제?')

    //근데 프리로드가 됐는가?
    //프리로드 안됐어도 isload 바뀌면 여기 다시 옴.
    if(isload){
      // console.log('쌓을준비 완료!',containerWidth,rows)
      block(parseInt(100/rows));
    }
  },[containerWidth,rows,isload])

  function gotoDetail(num){
    history.push(`/article/${num}`)
  }

  //쌓는함수
  function block(percent){
    console.log(like,'like!!')
    // console.log("이건 block함수",containerWidth,rows,percent,heightArr)

    // console.log('block함수 시작')
    // console.log(heightArr)
    // console.log('block',images)

    if(!percent) {
      percent = 100;
      heightArr=[0];
    }

    const division = document.getElementById("container");

    let container = document.getElementById("feedcontainer");

    while (division.hasChildNodes()) {
      division.removeChild(division.firstChild);
    }
    // console.log(images)
    //이제 이미지 차곡차곡 쌓을거임.
    images.map((image,index)=>{
      console.log(index)
      image.removeAttribute("width","100%");
      image.removeAttribute("height","100%");

      let min_height = heightArr[0];
      let min_idx = 0;

      for (let i = 0; i < heightArr.length; i++) {
        if(heightArr[i]<min_height){
          min_height = heightArr[i];
          min_idx = i
        } 
      }

      //이미지를 둘러쌀 box하나 만듬.
      const box = document.createElement("div")

      var heart = new Image();
      heart.src = `${process.env.PUBLIC_URL}/image/heart.png`;
      heart.style.position="absolute";
      if(like[index]==false){
        heart.style.display="none"
      }

      var heart2 = new Image();
      heart2.src = `${process.env.PUBLIC_URL}/image/empty_heart.png`;
      heart2.style.position="absolute";
      if(like[index]==true){
        heart2.style.display="none"
      }

      const imageHeight = ((container.offsetWidth * (percent/100) * image.height) / image.width);
      box.style.position="absolute";
      box.style.left=`${container.offsetWidth * (percent/100) * min_idx}px`
      box.style.top=`${heightArr[min_idx]}px`;
      box.style.width=`${percent}%`
      box.style.height=`${imageHeight}`
      box.style.borderRadius="10px"
      box.style.overflow = "hidden"
      box.appendChild(image);
      box.appendChild(heart);
      box.appendChild(heart2);
      image.style.objectFit = "cover"
      heart.style.width = "10%"
      heart.style.height = "auto"
      heart.style.zIndex = 1
      heart.style.right = "3%";
      heart.style.bottom = "3%";
      heart2.style.width = "10%"
      heart2.style.height = "auto"
      heart2.style.zIndex = 1
      heart2.style.right = "3%";
      heart2.style.bottom = "3%";
      box.addEventListener("click",()=>gotoDetail(url_arr[index].feedNo))
      image.setAttribute("width","100%");
      image.setAttribute("height","100%");
      division.appendChild(box);
      heightArr[min_idx] += imageHeight+20;
    })
    // console.log('block함수 끝')
  }

  const style = {
    color : 'black',
  }
  
  return (
    <Container id="feedcontainer">
      <div style={{
        width:"100%",
        marginBottom:"10%",
        textAlign:"center",
        lineHeight:"25vh",
        paddingRight:0,
        paddingLeft:0,
        }}>
        <Map />
      </div>
      <div id="container" style={{display:'flex',position:'relative'}}>
      </div>
      {
        url_arr.map((url,index)=>(
          <div>
            {index}번째 좋아요는?{url.liked}
            <br></br>
          </div>
        ))
      }
    </Container>
  )
}