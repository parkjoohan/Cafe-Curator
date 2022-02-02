package com.kql.caffein.controller;

import com.kql.caffein.service.GoogleLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Controller
@RequestMapping(value="/googleLogin")
public class GoogleLoginController {

    @Autowired
    private GoogleLoginService googleLoginService;

    @Value("${api.google.clientId}")
    private String clientId;

    @Value("${api.google.redirectURI}")
    private String redirectURI;

    @GetMapping("/getGoogleAuthURL")
    public String googleReqUrl() {
        String reqUrl = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectURI;
        return "redirect:"+reqUrl;
    }

    @GetMapping(value="/google")
    public ResponseEntity<String> googleLogin(@RequestParam(value = "code", required = false) String code){

        String newCode = null;
        try{
            newCode = URLEncoder.encode(code, "UTF-8");
        }catch (UnsupportedEncodingException e){
            e.printStackTrace();
        }
        System.out.println("authorize_code");
        System.out.println(newCode);
        System.out.println(code);

        String id_token = googleLoginService.getAccessToken(newCode);
        String Userid = googleLoginService.getUserInfo(id_token);
        System.out.println("이메일 : " + Userid);

        return new ResponseEntity<String>("구글 로그인" + Userid, HttpStatus.OK);
    }
}