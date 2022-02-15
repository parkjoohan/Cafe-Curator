import React, { useState, useEffect } from 'react'
import { Container,Grid,Col,Row } from 'react-bootstrap'
import './css/Home.css'
import styles from './css/Home.module.css'
import Card from './Card';
import { Link } from 'react-router-dom'
import AOS from 'aos';
import "aos/dist/aos.css";

import axios from 'axios';

export default function Home(props) {

  useEffect(()=>{
    AOS.init();
  },[])

  return (

    <div id="home_home">
      <div id='home_section1'>
        {/* <div id='hone_video_bg'> */}
          <video id='home_video' src='../image/black_cafe.mp4' autoPlay loop muted></video>
          <div id='home_text_wrapper'>
            <h1 id='home_hometitle'>나만의 카페를 찾아보세요!</h1>
            <h3 id='home_introduce'>
              자신의 관심사를 선택하세요!<br/>
              {props.user}님을 위한 카페를 추천해드립니다!<br/>
            </h3>
          </div>
        {/* </div> */}
      </div>               
      <div className='section2'>

        <section class="content-section" data-aos="fade-right" data-aos-duration="2000">
          <div class="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/mapsearch.jpg"} />
            <div class="content">
              <h1 class="subheading">지도 중심 찾기</h1>
              <h2 class="heading">내 위치를 중심으로 찾아보세요.</h2>
              <h2 class="subheading link">더 알아보기 ></h2>
            </div>
          </div>
        </section>

        <section class="content-section" data-aos="fade-right" data-aos-duration="2000">
          <div class="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/coffeesearch.jpg"} />
            <div class="content">
              <h1 class="subheading">원두 중심 찾기</h1>
              <h2 class="heading">원두를 중심으로 찾아보세요.</h2>
              <h2 class="subheading link">더 알아보기 ></h2>
            </div>
          </div>
        </section>

        <section class="content-section" data-aos="fade-right" data-aos-duration="2000">
          <div class="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/landscapesearch2.jpg"} />
            <div class="content">
              <h1 class="subheading">전망 중심 찾기</h1>
              <h2 class="heading">전망 좋은 카페를 찾아보세요.</h2>
              <h2 class="subheading link">더 알아보기 ></h2>
            </div>
          </div>
        </section>

        <section class="content-section" data-aos="fade-right" data-aos-duration="2000">
          <div class="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/studysearch.jpg"} />
            <div class="content">
              <h1 class="subheading">스터디 카페 찾기</h1>
              <h2 class="heading">공부하기 좋은 카페를 찾아보세요.</h2>
              <h2 class="subheading link">더 알아보기 ></h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}