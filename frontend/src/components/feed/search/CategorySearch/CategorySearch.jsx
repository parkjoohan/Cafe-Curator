import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Row, Col } from 'react-bootstrap'
import CategorySearchfeed from './CategorySearchfeed'
import { useParams } from 'react-router-dom'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CakeIcon from '@mui/icons-material/Cake';
import CameraIcon from '@mui/icons-material/Camera';
import CoffeeIcon from '@mui/icons-material/Coffee';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CottageIcon from '@mui/icons-material/Cottage';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import CookieIcon from '@mui/icons-material/Cookie';
import { pink, brown, lime, yellow, deepPurple, lightBlue, grey, teal } from '@mui/material/colors';


export default function CategorySearch(props) {
  let propcategory = useParams();
  const [category,setCategory] = useState("커피")
  const [poporlast,setPoporlast] = useState("recent")

  useEffect(()=>{
    // console.log(props.user)
    if(propcategory){
      setCategory(propcategory.category)
    }
  },[])

  useEffect(()=>{
    if(props.setFootershow){
      props.setFootershow(false);
      return (()=>{
        props.setFootershow(true);
      })
    }
  },[props.setFootershow])
  return (
    <div>
        <Container>
        <div>
          <Button onClick={() => setCategory("커피")} variant="light">
          <Chip icon={<CoffeeIcon />} label="커피 맛집" style={{backgroundColor:`${brown[100]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("케이크")} variant="light">
          <Chip icon={<CakeIcon />} label="케이크 맛집" style={{backgroundColor:`${pink[100]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("마카롱/쿠키")} variant="light">
          <Chip icon={<CookieIcon />} label="마카롱/쿠키 맛집" style={{backgroundColor:`${brown[200]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("브런치")} variant="light">
          <Chip icon={<BrunchDiningIcon />} label="브런치 맛집" style={{backgroundColor:`${yellow[100]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("차")} variant="light">
          <Chip icon={<FreeBreakfastIcon />} label="차 맛집" style={{backgroundColor:`${lime[100]}`}} />
          </Button>
        </div>
        <div>
          <Button onClick={() => setCategory("사진찍기 좋은")} variant="light">
          <Chip icon={<CameraIcon />} label="사진찍기 좋은 장소" style={{backgroundColor:`${lightBlue[100]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("아늑한")} variant="light">
          <Chip icon={<CottageIcon />} label="아늑한 장소" style={{backgroundColor:`${brown[300]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("힙한")} variant="light">
          <Chip icon={<NightlifeIcon />} label="힙한 장소" style={{backgroundColor:`${deepPurple[200]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("공부하기 좋은")} variant="light">
          <Chip icon={<MenuBookIcon />} label="공부하기 좋은 장소" style={{backgroundColor:`${grey[400]}`}} />
          </Button>{' '}
          <Button onClick={() => setCategory("테마있는")} variant="light">
          <Chip icon={<BedroomBabyIcon />} label="테마있는 장소" style={{backgroundColor:`${teal[400]}`}} />
          </Button>
        </div>
        
        <Row style={{marginTop: "2%"}}>
          <Col lg={5} style={{textAlignLast: "right"}}>
            <h1>선택한 카테고리:</h1>
          </Col>
          <Col lg={3} style={{textAlignLast: "left"}}>
            <h1>{category}</h1>
          </Col>
          <Col lg={2} style={{textAlignLast: "left"}}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {poporlast=="top"?
                  <strong>인기순</strong>:
                  <strong>최신순</strong>
                }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>{setPoporlast("recent")}}>최신순</Dropdown.Item>
                <Dropdown.Item onClick={()=>{setPoporlast("top")}}>인기순</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>

        </Container>
        <CategorySearchfeed category={category} poporlast={poporlast} user={props.user}/>
        
    </div>
  )
}
