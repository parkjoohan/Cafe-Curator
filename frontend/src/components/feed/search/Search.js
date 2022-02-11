/* global kakao */

import React, { useState, useEffect } from 'react';
import {TextField, Button} from '@material-ui/core';
import axios from 'axios';
import "./css/Search.css";
import { Col, Row } from 'react-bootstrap';

export default function Search(props) {

  const [keyword,setKeyword] = useState("");
  const [searchkeyword,setSearchkeyword] = useState("")
  const [results,setResults] = useState([]);
  const [select,setSelect] = useState({});
  const [form,setForm] = useState({
    cafeName:null,
    cafeX:null,
    cafeY:null,
    cafeAddress:null,
  })

  const onChange = e => {
    setKeyword(e.target.value)
  }

  const search = e => {
    if(e._reactName=="onKeyDown"){
      if(e.code=="Enter"){
        setSearchkeyword(keyword);
      }
    }else{
      setSearchkeyword(keyword)
    }
  }

  useEffect(()=>{
    if (!searchkeyword) {
      setResults([]);
    }else{
    var options = {
      center: new kakao.maps.LatLng(35.20412033455932, 126.8071773145007),
      level: 7
    };

    var ps = new kakao.maps.services.Places(); 

    ps.keywordSearch(searchkeyword, placesSearchCB); 

    function placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newData = []
        for (let i = 0; i < data.length; i++) {
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
  },[searchkeyword]);

  useEffect(()=>{
    props.setData(results)
  },[results])

  function selectcafe(d){
    setSelect(d)
  };

  return (
    <div id="search_textField_div">
      <TextField  label="Cafe name" placeholder='카페 이름' onChange={e => onChange(e)}></TextField>
    </div>
  )
}