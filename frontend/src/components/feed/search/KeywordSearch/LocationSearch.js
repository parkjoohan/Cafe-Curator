import React,{useState,useEffect,useRef} from 'react';
import './css/Location.css'
import LocationSearchfeed from './LocationSearchfeed';
import { Container } from 'react-bootstrap'
import Search from './Search';
import Map from './Map';
import axios from 'axios'

export default function LocationSearch(props) {

    const mapRef = useRef();
    const [data,setData] = useState([]);
    const feedRef = useRef();
    const [selected, setSelected] = useState(null)
    const [selectLocation,setSelectLocation] = useState([])

    useEffect(()=>{
        // console.log(selectLocation)
    },[selectLocation])



    useEffect(()=>{
        if(mapRef.current){
            mapRef.current.setMarkerdata(data)
        }
        feedRef.current.setLocationarr([])
    },[data])

    useEffect(()=>{
        // console.log(data[selected])
        if(selected!==null){
            // console.log('선택했다!',selected)
            const url = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=devU01TX0FVVEgyMDIyMDEyNzE0MTY1MTExMjE4Nzg=
            &keyword=${data[selected].address_name}&resultType=json`
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

                let newlocationarr = [Number(beforex),Number(beforey)]
                setSelectLocation(newlocationarr)
                feedRef.current.setLocationarr(newlocationarr)
            })
            })
        }
    },[selected])

    

    return (
        <Container>
            <Search setData={setData}/>
            <div>
                <Map id="LocationSearch_map" ref={mapRef} setSelected={setSelected}  selectLocation={selectLocation}/>
            </div>
            <div id='LocationSearch_blog'>
                <LocationSearchfeed ref={feedRef}/>
            </div>
        </Container>
    );
}
