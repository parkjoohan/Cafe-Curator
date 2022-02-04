import React from 'react';
import './css/Location.css'
import Map from '../main/Map'
import Blog from '../blog/BlogPrint'
import {Container} from 'react-bootstrap'

export default function LocationSearch(props) {
    return (
        <Container>
            <div>
                <Map id="LocationSearch_map" />
            </div>
            <div id='LocationSearch_blog'>
                <Blog />
            </div>
        </Container>
    );
}
