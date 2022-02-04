/*global kakao*/ 
import React, { useEffect } from 'react'
import "./css/Map.css";
const Map=()=>{

  useEffect(()=>{
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(35.20412033455932, 126.8071773145007),
      level: 7
    };
    var map = new kakao.maps.Map(container, options);

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
        
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function(position) {
          
          var lat = position.coords.latitude, // 위도
              lon = position.coords.longitude; // 경도
          
          var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
              message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          
          // 마커와 인포윈도우를 표시합니다
          displayMarker(locPosition, message);
              
        });
      
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      
      var locPosition = kakao.maps.LatLng(35.20412033455932, 126.8071773145007),    
          message = 'geolocation을 사용할 수 없어요..'
          
      displayMarker(locPosition, message);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition
      }); 
      
      var iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;

      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      
      // 인포윈도우를 마커위에 표시합니다 
      infowindow.open(map, marker);
      
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);      
    }    

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    }, [])


    return (
        <div id='mapContainer'>
        	<div id="map" style={{width:"100%", height:"550px"}}></div> 
        </div>
    )
}

export default Map;