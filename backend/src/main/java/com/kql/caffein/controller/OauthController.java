//package com.kql.caffein.controller;
//
//import com.amazonaws.Response;
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.Map;
//
//@Slf4j
//@Api(tags = {"Oauth Controller"})
//@CrossOrigin(origins = {"*"}, maxAge = 6000)
//@RestController
//@RequiredArgsConstructor
//public class OauthController {
//    @ApiOperation(value = "구글 로그인")
//    @GetMapping("/login/oauth2/code/google")
//    public ResponseEntity <Map<String, Object>> googleLogin(String code){
//        log.info("googleLogin called!! code: {}", code);
//
//    }
//}
