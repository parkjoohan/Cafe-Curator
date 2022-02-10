import React,{useState,useEffect,useRef} from 'react';
import './css/Location.css'
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
                <Map id="LocationSearch_map" ref={mapRef}/>
            </div>
            <div id='LocationSearch_blog'>
                <Blog />
            </div>
        </Container>
    );
}
