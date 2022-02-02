/* global kakao */

import React,{useState,useEffect} from 'react';
import './css/Search.css'

export default function Search() {

  const [keyword,setKeyword] = useState("");
  const [results,setResults] = useState([]);

  const onChange = e => {
    setKeyword(e.target.value)
    console.log(e.target.value)
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

  return (
    <div>
      <input onChange={e => onChange(e)} style={{width:"100%"}}></input>
      <div>
        {
          results.map((d,index)=>(
            <div>
            <div id='search_detail'>주소:{d.address_name}</div>
            <div id='search_detail'>id:{d.id}</div>
            <div id='search_detail'>좌표:{d.x},{d.y}</div>
            <div id='search_detail'>이름:{d.place_name}</div>
            <div id='search_detail'>카테고리:{d.category_group_name}</div>
            <hr/>
            </div>
          ))
        }
      </div>
    </div>
  )
}
