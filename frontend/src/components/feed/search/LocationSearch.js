import React,{useState,useEffect,useRef} from 'react';
import './css/Location.css'
import Blog from '../blog/BlogPrint'
import { Container } from 'react-bootstrap'
import Search from './Search';
import Map from './Map';

export default function LocationSearch(props) {
    const [data,setData] = useState([]);

    useEffect(()=>{
        console.log(data)
    },[data])
    return (
        <Container>
            <Search setData={setData}/>
            <div>
                <Map id="LocationSearch_map" data={data}/>
            </div>
            <div id='LocationSearch_blog'>
                <Blog />
            </div>
        </Container>
    );
}
