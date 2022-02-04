import React, { useEffect } from 'react'
import { Container,Grid,Col,Row } from 'react-bootstrap'
import './css/Home.css'
import styles from './css/Home.module.css'
import Card from './Card';
import { Link } from 'react-router-dom'

export default function Home(props) {

  return (
    <div id="home_home">
      <div id='home_section1'>
        <div id='hone_video_bg'>
          <video id='home_video' src='../image/black_cafe.mp4' autoPlay loop muted></video>
          <div id='home_text_wrapper'>
            <h1 id='home_hometitle'>나만의 카페를 찾아보세요!</h1>
            <h3 id='home_introduce'>
              카페 큐레이팅 서비스 입니다.<br/>
              자신의 관심사를 선택하세요!<br/>
              {props.user}님을 위한 카페를 추천해드립니다!<br/>
              항상 환영합니다.
            </h3>
          </div>
        </div>
      </div>
      <div className='section2'>
        <Container className='content'>
          <Card
            title="지도중심 빠른찾기"
            sub_title="현 위치를 기준으로 카페를 추천"
            images="../image/Map2.png"
            alt="map"
            src="feed"
          ></Card>&nbsp;&nbsp;
          <Card
            title="원두족을 위한 추천"
            sub_title="커피 맛 좋은 카페를 추천"
            images="../image/Coffee.png"
            alt="coffee"
            src="bookmark"
          />&nbsp;&nbsp;
          <Card
            title="뷰 좋은 카페를 추천"
            sub_title="전망 좋은 카페를 추천"
            images="../image/View.png"
            alt="view"
            src="login"
          />&nbsp;&nbsp;
          <Card
            title="카공족을 위한 추천"
            sub_title="공부하기 좋은 카페를 추천"
            images="../image/Study.png"
            alt="study"
            src="signup"
          />
        </Container>
      </div>
    </div>
  )
}