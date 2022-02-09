import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Container,Row,Col,Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Map from './Map'


export default function Feed(props) {
  const [newdata,setNewdata] = useState([]);
  // 서버에서 받아올 데이터 중 이미지의 url이 저장됨 Array
  const [url_arr,setUrl] = useState([])

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

    window.addEventListener('scroll',scroll)

    if(url_arr.length != 0){
      // console.log('url_arr가 바뀌었다!',url_arr)
      let newLikearr = new Array(url_arr.length)

      for (let i = 0; i < newLikearr.length; i++) {
        newLikearr[i] = url_arr[i].liked
      }

      setLike(newLikearr)

      setload(false);

      // console.log('url_arr생성!')
      // console.log(url_arr)

      //생성,새로업데이트 된 이미지가 들어갈 배열길이 추가.
      //cnt부터하는 이유는. 무한스크롤이라고 가정했을 시,
      //지금까지 로드된 이미지 수가 cnt이기 때문.
      // console.log('현재 url_arr',url_arr)
      for (let i = cnt; i < url_arr.length; i++) {
        const image = new Image();
        image.onload = ()=>imageupload(image,i);
        image.src = url_arr[i].file.filePath
      }
    }
  },[url_arr]);

  function scroll(e){

    e.preventDefault();
    const getScrollTop = function () { return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop; }; 
    const getDocumentHeight = function () { const body = document.body; const html = document.documentElement; return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ); };
    // console.log(getScrollTop() == getDocumentHeight() - window.innerHeight)
    if (getScrollTop() == getDocumentHeight() - window.innerHeight) {
      window.removeEventListener('scroll',scroll)
      // console.log('스크롤이 맨 밑이다!')
      // console.log('현재 스크롤 위치',window.scrollY);
      nextLoading()
    }
  }

  //로딩함수(콜백)
  function nextLoading(){
    // console.log('@@@',url_arr[url_arr.length-1].feedNo)
    const url = "http://i6c104.p.ssafy.io:8080/feed/mainFeedList/a1"
      axios.get(url,{
        params:{
          "size":5,
          "type":"feed",
          "lastFeedNo": url_arr[url_arr.length-1].feedNo
        }
      }).then(function(res){
        // console.log('응답',res.data)
        update(res.data)
      }).catch(function(err){
        console.log(err)
      })
  }

  //업데이트
  const update = (data) => {
    setNewdata(data);
  }


  //이미지낱개 로드시 콜백함수
  function imageupload(image,i){
    // console.log("이미지 업로드됐다!",i)
    setCnt(prev=>(prev+1));
    //업로드된 이미지를 저장.
    let newimages = images;
    newimages[i] = image;
    setImages(newimages)
  }


  //이미지낱개 로드 성공한 수가 url_arr길이하고 같은가?
  useEffect(()=>{
    // console.log(cnt)
    if (cnt == url_arr.length && url_arr.length != 0) {
      //프리로드 전부 완료!
      // console.log('cnt와 url_arr가 같은가?',cnt,url_arr.length);
      setload(true);
      // console.log("url 전부 로드 완료!")
    }
  },[cnt]);


  //리사이즈 될때 이벤트 추가.
  useEffect(()=>{
    // console.log('현재 스크롤 위치',window.scrollY);
    // console.log('이게 가장 먼저 실행되겠지?')
    let container = document.getElementById("feedcontainer")
    let lastNo = 0
    setContainerWidth(container.offsetWidth);
    setRows(parseInt(container.offsetWidth/300))
    window.addEventListener('resize',handleResize);
    
    props.setFootershow(false)
  

    // const url = "http://localhost:8080/feed/mainFeedList/U003"
    const url = "http://i6c104.p.ssafy.io:8080/feed/mainFeedList/a1"

    axios.get(url,{
      params:{
        "size":5,
        "type":"feed",
        "lastFeedNo": null,
      }
    }).then(function(res){
      let newUrl = res.data
      // console.log('첫 데이터 받기 전 url_arr(빈 어레이여야함)',url_arr)
      setUrl(newUrl)
      lastNo = newUrl[newUrl.length-1].feedNo
    }).catch(console.log("DD"))

    return ()=>{
      window.removeEventListener('resize',handleResize);
      props.setFootershow(true)
    }
  },[])

  // function scroll(lastNo){
  //   const getScrollTop = function () { return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop; }; 
  //   const getDocumentHeight = function () { const body = document.body; const html = document.documentElement; return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ); };
  //   if (getScrollTop() === getDocumentHeight() - window.innerHeight) {
  //     // console.log('스크롤이 맨 밑이다!')
  //     nextLoading(lastNo)
  //   }
  // }

  // //로딩함수(콜백)
  // function nextLoading(lastNo){
  //   console.log('@@@',lastNo)
  //   const url = "http://localhost:8080/feed/mainFeedList/U003"
  //     axios.get(url,{
  //       params:{
  //         "size":5,
  //         "type":"feed",
  //         "lastFeedNo": null
  //       }
  //     }).then(function(res){
  //       // console.log('응답',res.data)
  //       update(res.data)
  //       lastNo = res.data[res.data.length-1].feedNo
  //     }).catch(function(err){
  //       console.log(err)
  //     })
  // }

  // //업데이트
  // const update = (data) => {
  //   setNewdata(data);
  // }

  useEffect(()=>{
    if(newdata.length!=0){
      // console.log('url_arr',url_arr)
      // console.log('새로 받은 데이터',newdata)
      let concaturl = url_arr.concat(newdata);
      setUrl(concaturl);
    }
  },[newdata])

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

  function likeArticle(index){
    // console.log(url_arr)
    const likeUrl = `http://i6c104.p.ssafy.io:8080/feed/like/${url_arr[index].feedNo}/a1`
    let heart = document.getElementById(`heart${index}`);
    let heart2 = document.getElementById(`heart2${index}`);
    axios.get(likeUrl).then(function(res){
      let newLike = [...like];
      if(res.data=="SUCCESS : DELETE LIKE"){
        newLike[index] = false;
        heart.style.display="none";
        heart2.style.display="block"
      }
      else {
        newLike[index] = true;
        heart.style.display="block";
        heart2.style.display="none";
      }
      setLike(newLike)
    }).catch(err=>console.log(err))
  }

  //쌓는함수
  async function block(percent){
    // console.log('현재 스크롤 위치',window.scrollY);
    // console.log(like,'like!!')
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
    // console.log('현재 스크롤 위치',window.scrollY);
    let nowscroll = window.scrollY
    console.log('이전 스크롤 위치',nowscroll)
    while (division.hasChildNodes()) {
      division.removeChild(division.firstChild);
    }
    console.log('여기서 스크롤이 바뀌네',window.scrollY)
    // console.log('현재 스크롤 위치',window.scrollY);
    // console.log(images)
    //이제 이미지 차곡차곡 쌓을거임.
    await images.map((image,index)=>{

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
      heart.id = `heart${index}`
      if(like[index]==false){
        heart.style.display="none"
      }else{
        heart.style.display="block"
      }


      var heart2 = new Image();
      heart2.src = `${process.env.PUBLIC_URL}/image/empty_heart.png`;
      heart2.style.position="absolute";
      heart2.id = `heart2${index}`
      if(like[index]==true){
        heart2.style.display="none"
      }else{
        heart2.style.display="block"
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
      image.addEventListener("click",()=>gotoDetail(url_arr[index].feedNo))
      heart.addEventListener("click",()=>likeArticle(index))
      heart2.addEventListener("click",()=>likeArticle(index))
      image.setAttribute("width","100%");
      image.setAttribute("height","100%");
      division.appendChild(box);
      heightArr[min_idx] += imageHeight+20;
    })
    console.log('다 쌓았다!')
    // console.log('현재 스크롤 위치',window.scrollY,'이동해야할 스크롤 위치',nowscroll,'height',document.body.scrollHeight)
    go(nowscroll)
    // console.log('block함수 끝')
    // console.log('현재 스크롤 위치',window.scrollY);
  }

  const go = scroll => {
    console.log('콜백함수 실행')
    console.log(scroll)
    setTimeout(()=>{
      window.scrollTo({top:scroll,left:0,behavior:"instant"})
    },0.1)
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
    </Container>
  )
}