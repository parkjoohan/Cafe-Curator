import React,{useState,useEffect} from 'react';
import SkeletonPrint from '../blog/BlogPrint'
import { Col, Row, Button, ButtonGroup, Container } from 'react-bootstrap'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PopularSearch from "./PopularSearch";
import RecentSearch from "./RecentSearch";
import LocationSearch from "./LocationSearch";
import CafeSearch from "./CafeSearch";
import AccountSearch from "./AccountSearch";
import './css/MainFeed3.css'



export default function Mainfeed(props) {
    
    const [currentClick, setCurrentClick] = React.useState(null);
    const [prevClick, setPrevClick] = React.useState(null);

    const GetClick = (e) => {
        setCurrentClick(e.target.id);
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
            <Router>
                <header style={{textAlign: "-webkit-center"}}>
                    <ButtonGroup>
                        <Link to="/popularsearch"><Button variant="light" id='search_popularsearch' onClick={GetClick}>인기순</Button></Link>
                        <Link to="/recentsearch"><Button variant="light" id='search_recentsearch' onClick={GetClick}>최신순</Button></Link>
                        <Link to="/locationsearch"><Button variant="light" id='search_locationsearch' onClick={GetClick}>장소</Button></Link>
                        <Link to="/cafesearch"><Button variant="light" id='search_cafesearch' onClick={GetClick}>카페</Button></Link>
                        <Link to="/accountsearch"><Button variant="light" id='search_accountsearch' onClick={GetClick}>계정</Button></Link>
                    </ButtonGroup>
                    <Row>
                        <Col>
                            <input id='search_input' placeholder='검색 내용을 입력하세요...'></input>
                            <Button id='search_button'>검색</Button>
                        </Col>
                        
                    </Row>
                    
                </header>
                <div>
                    <Switch>
                        <Route exact path="/popularsearch" component={PopularSearch} />
                        <Route path="/recentsearch" component={RecentSearch} />
                        <Route path="/locationsearch" component={LocationSearch} />
                        <Route path="/cafesearch" component={CafeSearch} />
                        <Route path="/accountsearch" component={AccountSearch} />
                    </Switch>
                </div>
            </Router>
        </Container>            

    );
}
