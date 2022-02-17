import React, { useState, useEffect } from 'react'
import { Container,Grid,Col,Row } from 'react-bootstrap'
import './css/Home.css'
import styles from './css/Home.module.css'
import Card from './Card';
import { Link, useHistory } from 'react-router-dom'
import AOS from 'aos';
import "aos/dist/aos.css";

import axios from 'axios';

export default function Home(props) {

  const history = useHistory();

  useEffect(()=>{
    AOS.init();
  },[])

  const gotoCategorySearch = (category) => {
    history.push(`/categorysearch/${category}`)
  }

  const gotoFeed = () => {
    history.push(`/feed`)
  }

  return (
    <div id="home_home">
      {/* <div id='home_section1'>
        <div id='home_video_bg'>
          <video id='home_video' src='../image/black_cafe.mp4' autoPlay loop muted></video>
          <div id='home_text_wrapper'>
            <h1 id='home_hometitle'>나만의 카페를 찾아보세요!</h1>
            <h3 id='home_introduce'>
              자신의 관심사를 선택하세요!<br/>
              {props.user[0]}님을 위한 카페를 추천해드립니다!<br/>
            </h3>
          </div>
        </div>
      </div>*/}
      <div id='home_section1'>
        <video id='home_video' src='../image/black_cafe.mp4' autoPlay loop muted></video>
        <div id='home_text_wrapper'>
          <h1>나만의 카페를 찾아보세요!</h1>
          <h3>
            자신의 관심사를 선택하세요!<br/>
            {props.user[0]}님을 위한 카페를 추천해드립니다!<br/>
          </h3>
        </div>
      </div>               

      <div className='section2'>
        <section id="content-section" data-aos="fade-up-right" data-aos-duration="2000">
          <div id="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/mapsearch.jpg"} />
            <div id="content">
              <h1 id="subheading">지도 중심 찾기</h1>
              <h2 id="heading">내 위치를 중심으로 찾아보세요.</h2>
              <h2 id="link" onClick={()=>gotoFeed()}>더 알아보기 &gt;</h2>
            </div>
          </div>
        </section>

        <section id="content-section" data-aos="fade-up-right" data-aos-duration="2000">
          <div id="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/coffeesearch.jpg"} />
            <div id="content">
              <h1 id="subheading">원두 중심 찾기</h1>
              <h2 id="heading">원두를 중심으로 찾아보세요.</h2>
              <h2 id="link" onClick={()=>gotoCategorySearch("커피")}>더 알아보기 &gt;</h2>
            </div>
          </div>
        </section>

        <section id="content-section" data-aos="fade-up-right" data-aos-duration="2000">
          <div id="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/landscapesearch2.jpg"} />
            <div id="content">
              <h1 id="subheading">전망 중심 찾기</h1>
              <h2 id="heading">전망 좋은 카페를 찾아보세요.</h2>
              <h2 id="link" onClick={()=>gotoCategorySearch("사진찍기 좋은")}>더 알아보기 &gt;</h2>
            </div>
          </div>
        </section>

        <section id="content-section" data-aos="fade-up-right" data-aos-duration="2000">
          <div id="figure">
            <img src={process.env.PUBLIC_URL + "/image/homeimage/studysearch.jpg"} />
            <div id="content">
              <h1 id="subheading">스터디 카페 찾기</h1>
              <h2 id="heading">공부하기 좋은 카페를 찾아보세요.</h2>
              <h2 id="link" onClick={()=>gotoCategorySearch("공부하기 좋은")}>더 알아보기 &gt;</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}