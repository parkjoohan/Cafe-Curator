package com.kql.caffein.controller;

import com.kql.caffein.dto.Token;
import com.kql.caffein.dto.User.UserLoginDto;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.jwt.JwtFilter;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.repository.UserRepository;
import com.kql.caffein.service.GoogleLoginService;
import com.kql.caffein.service.KakaoLoginService;
import com.kql.caffein.service.NaverLoginService;
import com.kql.caffein.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Api(tags = {"Oauth Controller"})
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@Controller
@RequiredArgsConstructor
@RequestMapping(value="/login/oauth")
public class OauthController {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final UserService userService;

    @Autowired
    private KakaoLoginService kakaoLoginService;

    @Autowired
    private GoogleLoginService googleLoginService;

    @Autowired
    private NaverLoginService naverLoginService;

    @Value("${oauth.pass}")
    private String basePass;

    @Value("${api.google.clientId}")
    private String googleClientId;

    @Value("${api.google.redirectURI}")
    private String googleRedirectURI;

    @Value("${api.kakao.kakaoApiKey}")
    private String kakaoApiKey;

    @Value("${api.kakao.redirectURI}")
    private String kakaoRedirectURI;

    @Value("${api.naver.clientId}")
    private String naverClientId;

    @Value("${api.naver.redirectURI}")
    private String naverRedirectURI;

    @Value("${api.naver.state}")
    private String naverState;


    //구글 로그인창 호출
    @GetMapping("/getGoogleAuthURL")
    public String googleReqUrl() {
        String reqUrl = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&client_id=" + googleClientId + "&redirect_uri=" + googleRedirectURI;
        return "redirect:"+reqUrl;
    }

    @GetMapping(value="/google")
    public ResponseEntity googleLogin(@RequestParam(value = "code", required = false) String code) throws Exception {
        try{
            Map<String, String> map = new HashMap<>();
            String newCode = URLEncoder.encode(code, "UTF-8");

            String idToken = googleLoginService.getAccessToken(newCode);
            String email = googleLoginService.getUserInfo(idToken);
            log.info("이메일 : {}", email);

            //회원 중복검사
            Optional<User> user = userRepository.findByEmail(email);

            //이미 가입한 회원이면
            if(user.isPresent()) {
                String userNo = user.get().getUserNo();
                UserDetail userDetail = userDetailRepository.findByUserNo(userNo);

                UserLoginDto userLoginDto = new UserLoginDto();
                userLoginDto.setEmail(email);
                userLoginDto.setPass(basePass);
                Token jwt = userService.login(userLoginDto);

                map.put("userNo", userDetail.getUserNo());
                map.put("userId", userDetail.getUserId());
                map.put("picture", userDetail.getPicture());
                map.put("accessToken", jwt.getAccessToken());
                map.put("refreshToken", jwt.getRefreshToken());
                map.put("refreshTokenExpirationTime", jwt.getRefreshTokenExpirationTime().toString());

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

                //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
                return new ResponseEntity<>(map, httpHeaders, HttpStatus.OK);
            } else{ //가입된 회원이 아니면
                //회원가입을 시키고 userNo, userId를 가져온다.
                Map<String, String> map1 = googleLoginService.googleRegister(email);

                UserLoginDto userLoginDto = new UserLoginDto();
                userLoginDto.setEmail(email);
                userLoginDto.setPass(basePass);
                Token jwt = userService.login(userLoginDto);

                map.put("userNo", map1.get("userNo"));
                map.put("userId", map1.get("userId"));
                map.put("accessToken", jwt.getAccessToken());
                map.put("refreshToken", jwt.getRefreshToken());
                map.put("refreshTokenExpirationTime", jwt.getRefreshTokenExpirationTime().toString());

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

                //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
                return new ResponseEntity<>(map, httpHeaders, HttpStatus.OK);
            }
        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 카카오 로그인창 호출
    @GetMapping("/getKakaoAuthURL")
    public String kakaoReqUrl() {
        String reqUrl = "https://kauth.kakao.com/oauth/authorize?client_id=" + kakaoApiKey + "&redirect_uri="+ kakaoRedirectURI + "&response_type=code";
        return "redirect:"+reqUrl;
    }

    @GetMapping("/kakao")
    public ResponseEntity kakaoLogin (@RequestParam(value = "code", required = false) String code) throws Exception {
        try{
            Map<String, String> map = new HashMap<>();
            String access_Token = kakaoLoginService.getAccessToken(code);

            HashMap<String,Object> userInfo = kakaoLoginService.getUserInfo(access_Token);
            log.info("userId : {}", userInfo.get("id"));
            String email = userInfo.get("id") + "@kakao.com";
            log.info("email : {}", email);
            //회원 중복검사
            Optional<User> user = userRepository.findByEmail(email);

            //이미 가입한 회원이면
            if(user.isPresent()) {
                String userNo = user.get().getUserNo();
                UserDetail userDetail = userDetailRepository.findByUserNo(userNo);

                UserLoginDto userLoginDto = new UserLoginDto();
                userLoginDto.setEmail(email);
                userLoginDto.setPass(basePass);
                Token jwt = userService.login(userLoginDto);

                map.put("userNo", userDetail.getUserNo());
                map.put("userId", userDetail.getUserId());
                map.put("picture", userDetail.getPicture());
                map.put("accessToken", jwt.getAccessToken());
                map.put("refreshToken", jwt.getRefreshToken());
                map.put("refreshTokenExpirationTime", jwt.getRefreshTokenExpirationTime().toString());

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

                //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
                return new ResponseEntity<>(map, httpHeaders, HttpStatus.OK);
            } else{ //가입된 회원이 아니면
                //회원가입을 시키고 userNo, userId를 가져온다.
                Map<String, String> map1 = kakaoLoginService.kakaoRegister(email);

                UserLoginDto userLoginDto = new UserLoginDto();
                userLoginDto.setEmail(email);
                userLoginDto.setPass(basePass);
                Token jwt = userService.login(userLoginDto);

                map.put("userNo", map1.get("userNo"));
                map.put("userId", map1.get("userId"));
                map.put("accessToken", jwt.getAccessToken());
                map.put("refreshToken", jwt.getRefreshToken());
                map.put("refreshTokenExpirationTime", jwt.getRefreshTokenExpirationTime().toString());

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

                //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
                return new ResponseEntity<>(map, httpHeaders, HttpStatus.OK);
            }
        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //네이버 로그인창 호출
    @GetMapping("/getNaverAuthURL")
    public String naverReqUrl() {
        String reqUrl = "https://nid.naver.com/oauth2.0/authorize?client_id=" + naverClientId + "&redirect_uri="+ naverRedirectURI + "&state=" + naverState +"&response_type=code";
        return "redirect:"+reqUrl;
    }

    @GetMapping("/naver")
    public ResponseEntity naverLogin (@RequestParam(value = "code", required = false) String code) throws Exception {
        try{
            Map<String, String> map = new HashMap<>();
            String access_Token = naverLoginService.getAccessToken(code);
            String email = naverLoginService.getUserInfo(access_Token);

             //회원 중복검사
            Optional<User> user = userRepository.findByEmail(email);

            //이미 가입한 회원이면
            if(user.isPresent()) {
                String userNo = user.get().getUserNo();
                UserDetail userDetail = userDetailRepository.findByUserNo(userNo);

                UserLoginDto userLoginDto = new UserLoginDto();
                userLoginDto.setEmail(email);
                userLoginDto.setPass(basePass);
                Token jwt = userService.login(userLoginDto);

                map.put("userNo", userDetail.getUserNo());
                map.put("userId", userDetail.getUserId());
                map.put("picture", userDetail.getPicture());
                map.put("accessToken", jwt.getAccessToken());
                map.put("refreshToken", jwt.getRefreshToken());
                map.put("refreshTokenExpirationTime", jwt.getRefreshTokenExpirationTime().toString());

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

                //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
                return new ResponseEntity<>(map, httpHeaders, HttpStatus.OK);
            } else{ //가입된 회원이 아니면
                //회원가입을 시키고 userNo, userId를 가져온다.
                Map<String, String> map1 = naverLoginService.naverRegister(email);

                UserLoginDto userLoginDto = new UserLoginDto();
                userLoginDto.setEmail(email);
                userLoginDto.setPass(basePass);
                Token jwt = userService.login(userLoginDto);

                map.put("userNo", map1.get("userNo"));
                map.put("userId", map1.get("userId"));
                map.put("accessToken", jwt.getAccessToken());
                map.put("refreshToken", jwt.getRefreshToken());
                map.put("refreshTokenExpirationTime", jwt.getRefreshTokenExpirationTime().toString());

                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

                //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
                return new ResponseEntity<>(map, httpHeaders, HttpStatus.OK);
            }
        } catch (UnsupportedEncodingException e){
            e.printStackTrace();
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}