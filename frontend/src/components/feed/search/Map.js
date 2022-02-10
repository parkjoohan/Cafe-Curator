/*global kakao*/ 
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import "./css/Map.css";
const Map = forwardRef((props,ref)=>{

  const [markerdata,setMarkerdata] = useState([]);
  const [nowmarkers,setNowmarkers] = useState([]);

  useImperativeHandle(ref,()=>({
    setMarkerdata,
  }))

  useEffect(()=>{
    var mapContainer = document.getElementById('map')
    var mapOption = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3 // 지도의 확대 레벨
    };
    var map = new kakao.maps.Map(mapContainer, mapOption);
  },[])
  
  useEffect(()=>{
    console.log(markerdata)
    if(markerdata.length>0){

      var mapContainer = document.getElementById('map')

      while(mapContainer.hasChildNodes()){
        mapContainer.removeChild(mapContainer.firstChild);
      }
      
      var mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5 // 지도의 확대 레벨
      };
      var map = new kakao.maps.Map(mapContainer, mapOption);

      var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

      var bounds = new kakao.maps.LatLngBounds();
      
      for (let i = 0; i < markerdata.length; i++) {
        var imageSize = new kakao.maps.Size(24, 35); 
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
          map:map,
          title: markerdata[i].place_name,
          position:new kakao.maps.LatLng(markerdata[i].y, markerdata[i].x),
          image:markerImage
        })
        bounds.extend(new kakao.maps.LatLng(markerdata[i].y, markerdata[i].x))
      }
      map.setBounds(bounds)
    }
  },[markerdata])




    return (
        <div id='mapContainer'>
        	<div id="map" style={{width:"100%", height:"550px"}}></div> 
        </div>
    )
})

export default Map;