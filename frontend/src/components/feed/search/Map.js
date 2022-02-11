/*global kakao*/ 
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import "./css/Map.css";
const Map = forwardRef((props,ref)=>{

  const [markerdata,setMarkerdata] = useState([]);
  const [nowinfos,setNowinfos] = useState([]);

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
    if(markerdata.length>0){
      console.log(markerdata)

      var mapContainer = document.getElementById('map')

      while(mapContainer.hasChildNodes()){
        mapContainer.removeChild(mapContainer.firstChild);
      }
      
      var mapOption = { 
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5 // 지도의 확대 레벨
      };
      var map = new kakao.maps.Map(mapContainer, mapOption);

      var imageSrc = `${process.env.PUBLIC_URL}/image/marker.png`; 

      var bounds = new kakao.maps.LatLngBounds();
      
      let newinfoarr = new Array(markerdata.length);
      for (let i = 0; i < markerdata.length; i++) {
        var imageSize = new kakao.maps.Size(24, 35); 

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        var marker = new kakao.maps.Marker({
          map:map,
          title: markerdata[i].place_name,
          position:new kakao.maps.LatLng(markerdata[i].y, markerdata[i].x),
          image:markerImage
        })

        var content = `
        <div style="padding:10px; background-color:lightgray; border:1px solid black">
        <h6 style="font-weight:bold">${markerdata[i].place_name}</h6>
        <p style="font-size:80%">${markerdata[i].address_name}</p>
        <p style="font-size:80%">${markerdata[i].phone}</p>
        <p style="font-size:80%" onclick="console.log(${markerdata[i].place_name})">검색</p>
        </div>
        `
        var infowindow = new kakao.maps.InfoWindow({
          content : content,
          removable : true,
        });

        newinfoarr[i] = [marker,infowindow]

        bounds.extend(new kakao.maps.LatLng(markerdata[i].y, markerdata[i].x))
      }
      for (let i = 0; i < newinfoarr.length; i++) {
        kakao.maps.event.addListener(newinfoarr[i][0],'click',function(){
          newinfoarr[i][1].open(map,newinfoarr[i][0])
        })
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
