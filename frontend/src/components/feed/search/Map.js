/*global kakao*/ 
import React, {useState, useEffect} from 'react'
import "./css/Map.css";
const Map = ((props)=>{

  const [markerdata,setMarkerdata] = useState([]);

  if(markerdata!=props.data){
    setMarkerdata(props.data);
  }

  useEffect(()=>{
  },[])
  
  useEffect(()=>{
    var mapContainer = document.getElementById('map') // 지도를 표시할 div  

    while(mapContainer.hasChildNodes()){
      mapContainer.removeChild(mapContainer.firstChild);
    }

    var mapOption = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


    var positions = new Array(markerdata.length);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = {
        title:`cafe${i}`,
        latlng: new kakao.maps.LatLng(markerdata[i].y,markerdata[i].x)
      }
    }

    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

    for (var i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
        marker.setMap(map);
    }
  },[markerdata])

  // useEffect(()=>{
  //   var container = document.getElementById('map');
  //   var options = {
  //     center: new kakao.maps.LatLng(35.20412033455932, 126.8071773145007),
  //     level: 7
  //   };
  //   var map = new kakao.maps.Map(container, options);

  //   // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
  //   if (navigator.geolocation) {
        
  //     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
  //     navigator.geolocation.getCurrentPosition(function(position) {
          
  //         var lat = position.coords.latitude, // 위도
  //             lon = position.coords.longitude; // 경도
          
  //         var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
  //             message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          
  //         // 마커와 인포윈도우를 표시합니다
  //         displayMarker(locPosition, message);
              
  //       });
      
  //   } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      
  //     var locPosition = kakao.maps.LatLng(35.20412033455932, 126.8071773145007),    
  //         message = 'geolocation을 사용할 수 없어요..'
          
  //     displayMarker(locPosition, message);
  //   }

  //   // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  //   function displayMarker(locPosition, message) {

  //     // 마커를 생성합니다
  //     var marker = new kakao.maps.Marker({  
  //         map: map, 
  //         position: locPosition
  //     }); 
      
  //     var iwContent = message, // 인포윈도우에 표시할 내용
  //         iwRemoveable = true;

  //     // 인포윈도우를 생성합니다
  //     var infowindow = new kakao.maps.InfoWindow({
  //         content : iwContent,
  //         removable : iwRemoveable
  //     });
      
  //     // 인포윈도우를 마커위에 표시합니다 
  //     infowindow.open(map, marker);
      
  //     // 지도 중심좌표를 접속위치로 변경합니다
  //     map.setCenter(locPosition);      
  //   }    

  //   // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  //   var zoomControl = new kakao.maps.ZoomControl();
  //   map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  //   // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  //   var mapTypeControl = new kakao.maps.MapTypeControl();
  //   map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  //   }, [])


    return (
        <div id='mapContainer'>
        	<div id="map" style={{width:"100%", height:"550px"}}></div> 
        </div>
    )
})

export default Map;