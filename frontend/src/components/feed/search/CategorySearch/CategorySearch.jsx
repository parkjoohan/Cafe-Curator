import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown } from 'react-bootstrap'
import CategorySearchfeed from './CategorySearchfeed'
import { useParams } from 'react-router-dom'

export default function CategorySearch(props) {
  let propcategory = useParams();
  const [category,setCategory] = useState("커피")
  const [poporlast,setPoporlast] = useState("recent")

  useEffect(()=>{
    console.log(props.user)
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
          <Button onClick={()=>setCategory("커피")}variant="primary">커피</Button>{' '}
          <Button onClick={()=>setCategory("케이크")}variant="secondary">케이크</Button>{' '}
          <Button onClick={()=>setCategory("마카롱/쿠키")}variant="success">마카롱/쿠키</Button>{' '}
          <Button onClick={()=>setCategory("브런치")}variant="warning">브런치</Button>{' '}
          <Button onClick={()=>setCategory("차")}variant="danger">차</Button>
        </div>
        <div>
          <Button onClick={()=>setCategory("사진찍기 좋은")}variant="primary">사진찍기 좋은</Button>{' '}
          <Button onClick={()=>setCategory("아늑한")}variant="secondary">아늑한</Button>{' '}
          <Button onClick={()=>setCategory("힙한")}variant="success">힙한</Button>{' '}
          <Button onClick={()=>setCategory("공부하기 좋은")}variant="warning">공부하기 좋은</Button>{' '}
          <Button onClick={()=>setCategory("테마있는")}variant="danger">테마있는</Button>
        </div>
        <h1>선택한 카테고리:{category}</h1>
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
        </Container>
        <CategorySearchfeed category={category} poporlast={poporlast} user={props.user}/>
        
    </div>
  )
}
