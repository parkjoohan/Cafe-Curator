import React,{useState,useEffect} from 'react';
// import Toggle from './Toggle';
// import Feed from './Feed';
import SkeletonPrint from '../blog/BlogPrint'
import {Container,Col,Row,Button,ButtonGroup} from 'react-bootstrap'
import { Link,useHistory } from 'react-router-dom'
import WriteModal from '../article/WriteModal'
import './css/MainFeed3.css'


export default function Mainfeed(props) {
    
    const [currentClick, setCurrentClick] = React.useState(null);
    const [prevClick, setPrevClick] = React.useState(null);

    const GetClick = (e) => {
    setCurrentClick(e.target.id);
    console.log(e.target.id);
    };

    React.useEffect(
        (e) => {
        if (currentClick !== null) {
            let current = document.getElementById(currentClick);
            console.log(current);
            current.style.backgroundColor = "gray";
            current.style.color = "white";
        }

        if (prevClick !== null) {
            let prev = document.getElementById(prevClick);
            prev.style.color = "black";
            prev.style.backgroundColor = "white";
        }
        setPrevClick(currentClick);
        },
        [currentClick]
    );

    return (
        <Container id='search_button_form'>
            <div >
                <ButtonGroup>
                    <Button variant="light" id='search_button1' onClick={GetClick}>인기순</Button>
                    <Button variant="light" id='search_button2' onClick={GetClick}>최신순</Button>
                    <Button variant="light" id='search_button3' onClick={GetClick}>장소</Button>
                    <Button variant="light" id='search_button4' onClick={GetClick}>카페</Button>
                    <Button variant="light" id='search_button5' onClick={GetClick}>계정</Button>
                </ButtonGroup>
            </div>
        </Container>
    );
}
