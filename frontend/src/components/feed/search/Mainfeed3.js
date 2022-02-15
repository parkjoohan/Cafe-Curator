import React,{useState,useEffect} from 'react';
import SkeletonPrint from '../blog/BlogPrint'
import { Col, Row, Button, ButtonGroup, Container } from 'react-bootstrap'
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import PopularSearch from "./PopularSearch";
import RecentSearch from "./RecentSearch";
import LocationSearch from "./KeywordSearch/LocationSearch";
// import CafeSearch from "./CafeSearch";
import AccountSearch from "./AccountSearch/AccountSearch";
import './css/MainFeed3.css'

export default function Mainfeed(props) {

    
    const [currentClick, setCurrentClick] = React.useState(null);
    const [prevClick, setPrevClick] = React.useState(null);
    const [cafeinfo,setCafeinfo] = useState({})

    const GetClick = (e) => {
        setCurrentClick(e.target.id);
    };

    useEffect(()=>{
        props.setFootershow(false);
        return () => {
            props.setFootershow(true);
        }
    },[])

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
                <div id='search_button_div' style={{textAlign: "center" }}>
                    <Row id='search_button_group'>
                        <Col lg={2}>
                            <Link to="/popularsearch"><Button variant="light" id='search_popularsearch' onClick={GetClick}>인기순</Button></Link>
                        </Col>
                        <Col lg={2}>
                            <Link to="/recentsearch"><Button variant="light" id='search_recentsearch' onClick={GetClick}>최신순</Button></Link>
                        </Col>
                        <Col lg={2}>
                            <Link to="/locationsearch"><Button variant="light" id='search_locationsearch' onClick={GetClick}>장소</Button></Link>
                        </Col>
                        {/* <Col lg={2}>
                            <Link to="/cafesearch"><Button variant="light" id='search_cafesearch' onClick={GetClick}>카페</Button></Link>
                        </Col> */}
                        <Col lg={2}>
                            <Link to="/accountsearch"><Button variant="light" id='search_accountsearch' onClick={GetClick}>계정</Button></Link>
                        </Col>
                    </Row>  
                </div>
                <div>
                    <Switch>
                        <Route exact path="/popularsearch" component={PopularSearch} />
                        <Route path="/recentsearch" component={RecentSearch} />
                        <Route path="/locationsearch" component={LocationSearch} />
                        {/* <Route path="/cafesearch" component={CafeSearch} /> */}
                        <Route path="/accountsearch" component={AccountSearch} />
                    </Switch>
                </div>
            </Router>
            
        </Container>            
       
    );
}

