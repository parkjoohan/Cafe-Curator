import React,{useState,useEffect} from 'react';
import SkeletonPrint from '../blog/BlogPrint'
import { Col, Row, Button, ButtonGroup, Container } from 'react-bootstrap'
import { Link, Route, Switch, BrowserRouter as Router ,useHistory} from "react-router-dom";
import PopularSearch from "./PopularSearch";
import RecentSearch from "./RecentSearch";
import LocationSearch from "./KeywordSearch/LocationSearch";
import AccountSearch from "./AccountSearch/AccountSearch";
import './css/MainFeed3.css'
import CategorySearch from './CategorySearch/CategorySearch';

export default function Mainfeed(props) {

    const history = useHistory();
    const [currentClick, setCurrentClick] = React.useState(null);
    const [prevClick, setPrevClick] = React.useState(null);
    const [cafeinfo,setCafeinfo] = useState({})

    const GetClick = (e) => {
        setCurrentClick(e.target.id);
    };

    useEffect(()=>{
        console.log(props.user)
        if(props.user[0]==null){
            alert('로그인이 필요합니다!')
            history.goBack();  
        }

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
            current.style.color = "#06c";
            // current.style.textDecoration="underline"
            
        }

        if (prevClick !== null) {
            let prev = document.getElementById(prevClick);
            prev.style.color = "#666";
            // prev.style.textDecoration="none"
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
                        {/* <Col lg={2}>
                            <Link id="search_link" to="/popularsearch"><div variant="light" id='search_popularsearch' onClick={GetClick}>인기순</div></Link>
                        </Col>
                        <Col lg={2}>
                            <Link id="search_link" to="/recentsearch"><div variant="light" id='search_recentsearch' onClick={GetClick}>최신순</div></Link>
                        </Col> */}
                        <Col lg={2}>
                            <Link id="search_link" to="/categorysearch"><div variant="light" id='search_locationsearch' onClick={GetClick}>카테고리</div></Link>
                        </Col>
                        <Col lg={2}>
                            <Link id="search_link" to="/locationsearch"><div variant="light" id='search_locationsearch' onClick={GetClick}>장소</div></Link>
                        </Col>
                        <Col lg={2}>
                            <Link id="search_link" to="/accountsearch"><div variant="light" id='search_accountsearch' onClick={GetClick}>계정</div></Link>
                        </Col>
                    </Row>  
                </div>
                <div>
                    <Switch>
                        <Route exact path="/popularsearch" component={PopularSearch} />
                        <Route path="/recentsearch" component={RecentSearch} />
                        <Route path="/locationsearch" component={LocationSearch} />
                        <Route path="/accountsearch" component={AccountSearch} />
                        <Route path="/categorysearch"><CategorySearch user={props.user} setFootershow={props.setFootershow}/></Route>
                    </Switch>
                </div>
            </Router>
            
        </Container>            
       
    );
}