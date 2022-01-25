import React, { useEffect } from 'react'
import { Container,Grid,Col,Row } from 'react-bootstrap'
import './css/Home.css'
import styles from './css/Home.module.css'
import Card from './Card';

export default function Home(props) {

  return (
    <div className="home">
      <div className='section1'>
        <video className='video' src='../image/black_cafe.mp4' autoPlay loop muted></video>
        <div className='text-wrapper'>
          <h1 className='hometitle'>나만의 카페를 찾아보세요!</h1>
          <h3 className='introduce'>
            카페 큐레이팅 서비스 입니다.<br/>
            자신의 관심사를 선택하세요!<br/>
            {props.user}님을 위한 카페를 추천해드립니다!<br/>
            항상 환영합니다.
          </h3>
        </div>
      </div>
      <div className='section2'>
        <Container className='content'>
          <Card
            title="지도중심 빠른찾기"
            sub_title="현 위치를 기준으로 카페를 추천"
            images="../image/Map2.png"
            alt="map"
          />&nbsp;&nbsp;
          <Card
            title="원두족을 위한 추천"
            sub_title="커피 맛 좋은 카페를 추천"
            images="../image/Coffee.png"
            alt="coffee"
          />&nbsp;&nbsp;
          <Card
            title="뷰 좋은 카페를 추천"
            sub_title="전망 좋은 카페를 추천"
            images="../image/View.png"
            alt="view"
          />&nbsp;&nbsp;
          <Card
            title="카공족을 위한 추천"
            sub_title="공부하기 좋은 카페를 추천"
            images="../image/Study.png"
            alt="study"
          />
        </Container>
      </div>
    </div>
  )
}