package com.kql.caffein.controller;

import com.kql.caffein.service.KakaoLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;


@Controller
public class KakaoLoginController {

    @Autowired
    private KakaoLoginService kakaoLoginService;

    @Value("${api.kakao.kakaoApiKey}")
    private String kakaoApiKey;

    @Value("${api.kakao.redirectURI}")
    private String redirectURI;

    // 카카오 로그인창 호출
    @GetMapping("/login/getKakaoAuthURL")
    public String kakaoReqUrl() {
        String reqUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoApiKey + "&redirect_uri="+ redirectURI + "&response_type=code";
        return "redirect:"+reqUrl;
    }

    @GetMapping("/login/kakao")
    public void kakaoLogin (@RequestParam(value = "code", required = false) String code) {

        String access_Token = kakaoLoginService.getAccessToken(code);

        HashMap<String,Object> userInfo = kakaoLoginService.getUserInfo(access_Token);
        System.out.println("###userId#### : " + userInfo.get("id"));
        System.out.println("###userDate#### : " + userInfo.get("date"));

        //db에 존재하는지 확인

        //존재하지 않으면 추가 회원가입 진행


    }

}
