package com.kql.caffein.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;


@RestController
public class KakaoLoginController {

    private String kakaoApiKey = "7dd53c2fa9cba99f9b6365290740ee5a";
    private String redirectURI = "http://localhost:8080/login/kako";


    // 카카오 로그인창 호출
    @GetMapping("/login/getKakaoAuthURL")
    public @ResponseBody
    String getKakaoAuthUrl(HttpServletRequest request) throws Exception {
        String reqUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoApiKey + "&redirect_uri="+ redirectURI + "&response_type=code";
        return reqUrl;
    }
}
