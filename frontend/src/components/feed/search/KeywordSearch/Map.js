/*global kakao*/ 
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'
import "./css/Map.css";
const Map = forwardRef((props,ref)=>{

  const [markerdata,setMarkerdata] = useState([]);

  const [select,setSelect] = useState(null);

  useEffect(()=>{
    console.log(select)
  },[select])

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
        <div id='mape_modal'>
          <h6 id='map_modal_cafename'>${markerdata[i].place_name}</h6>
          <p id='map_modal_content'>${markerdata[i].address_name}</p>
          <p id='map_modal_content'>${markerdata[i].phone}</p>
          <p id='map_modal_content ${markerdata[i].id}'>검색</p>
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
          props.setSelected(i)
          const searchtag = document.getElementById(`map_modal_content ${markerdata[i].id}`);
          const id = Number(document.getElementById(`map_modal_content ${markerdata[i].id}`).id.split(' ')[1]);
          searchtag.addEventListener("click",()=>{
            console.log(markerdata[i])
          })

          for (let j = 0; j < newinfoarr.length; j++) {
            if(i!==j){
              newinfoarr[j][1].close(map,newinfoarr[j][0])
            }
          }

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
