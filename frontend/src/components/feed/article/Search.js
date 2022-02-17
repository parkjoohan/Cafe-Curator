/* global kakao */

import React, { useState, useEffect } from 'react';
import {TextField, Button} from '@material-ui/core';
import './css/Search.css'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';

export default function Search(props) {

  const [keyword,setKeyword] = useState("");
  const [results,setResults] = useState([]);
  const [select,setSelect] = useState({});
  const [form,setForm] = useState({
    cafeName:null,
    cafeX:null,
    cafeY:null,
    cafeAddress:null,
  })

  useEffect(()=>{
    props.setCafeinfo(form)
  },[form])

  const onChange = e => {
    setKeyword(e.target.value)
  }

  useEffect(()=>{
    if (!keyword) {
      setResults([]);
    }else{
    var options = {
      center: new kakao.maps.LatLng(35.20412033455932, 126.8071773145007),
      level: 7
    };

    var ps = new kakao.maps.services.Places(); 

    ps.keywordSearch(keyword, placesSearchCB); 

    function placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newData = []
        for (let i = 0; i < 5; i++) {
          try{
          if (data[i].category_group_name=="카페") {
            newData.push(
              data[i]
            )
          }
          }catch{}
        }
        setResults(newData)
      } 
    }
  }
  },[keyword]);

  useEffect(()=>{
    
  },[results])

  function selectcafe(d){
    setSelect(d)
  };

  useEffect(()=>{
    const newForm = {...form}
    newForm.cafeAddress = select.address_name;
    newForm.cafeName = select.place_name
    const url = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIyMDEyNzE0MTY1MTExMjE4Nzg=
    &keyword=${newForm.cafeAddress}&resultType=json`
    let rnMgtSn = "" //도로명코드
    let admCd = "" //행정구역코드
    let buldMnnm = 0 //건물본번
    let buldSlno = 0 //건물부번
    axios.get(url).then(res=>{
      rnMgtSn = res.data.results.juso[0].rnMgtSn
      admCd = res.data.results.juso[0].admCd
      buldMnnm = res.data.results.juso[0].buldMnnm
      buldSlno = res.data.results.juso[0].buldSlno
      const url2 = `https://www.juso.go.kr/addrlink/addrCoordApi.do?confmKey=devU01TX0FVVEgyMDIyMDEyNzE2MzYwNjExMjE4ODk=&rnMgtSn=${rnMgtSn}&admCd=${admCd}&buldMnnm=${buldMnnm}&buldSlno=${buldSlno}&resultType=json&udrtYn=0`
      axios.get(url2).then(res=>{
        let beforex = res.data.results.juso[0].entX;
        let beforey = res.data.results.juso[0].entY;
        let newForm = {...form}
        // console.log(select)
        newForm.cafeName = select.place_name
        newForm.cafeAddress = select.address_name
        newForm.cafeX = beforex
        newForm.cafeY = beforey
        setForm(newForm)
      })
    }).catch(err=>
      {}// console.log('카페 위치가 등록돼있지 않아요 ㅜㅜ')
      )
  },[select])

  return (
    <div>
      <TextField label="Cafe name" placeholder='카페 이름' onChange={e => onChange(e)} style={{width:"98%", marginLeft: "1%", marginBottom: "2%"}}></TextField>
      <div>
        {
          results.map((d, index) => (
            <>
              <div id='search_card' key={index} onClick={()=>selectcafe(d)}>
                <Row>
                  <Col md={1}>
                    <img id='search_marker' src={process.env.PUBLIC_URL + "/image/marker.png"}/>
                  </Col>
                  <Col md={11}>
                      <div id='search_cafe_name'>{d.place_name}</div>
                      <div id='search_cafe_address'>{d.address_name}</div>
                      {/* <div id='search_detail'>id:{d.id}</div>
                      <div id='search_detail'>좌표:{d.x},{d.y}</div>
                      <div id='search_detail'>카테고리:{d.category_group_name}</div> */}
                  </Col>
                </Row>
                </div>
              <hr id='search_hr' />
            </>
          ))
        }
      </div>
    </div>
  )
}