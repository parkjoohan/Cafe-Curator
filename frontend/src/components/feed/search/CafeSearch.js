import React,{useState,useEffect,useRef} from 'react';
import './css/CafeSearch.css'
import Blog from '../blog/BlogPrint'
import { Container } from 'react-bootstrap'
import Search from './Search';
import Map from './Map';

export default function LocationSearch(props) {
    const mapRef = useRef();
    const [data,setData] = useState([]);

    useEffect(()=>{
        if(mapRef.current){
            mapRef.current.setMarkerdata(data)
        }
    },[data])

    return (
        <Container>
            <Search setData={setData}/>
            <div>
                <Map id="CafeSearch_map" ref={mapRef}/>
            </div>
            <div id='CafeSearch_blog'>
                <Blog />
            </div>
        </Container>
    );
}
