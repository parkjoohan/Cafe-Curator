package com.kql.caffein.controller;

import com.kql.caffein.dto.*;
import com.kql.caffein.dto.Email.EmailAuthDto;
import com.kql.caffein.dto.User.UserDetailDto;
import com.kql.caffein.dto.User.UserDto;
import com.kql.caffein.dto.User.UserLoginDto;
import com.kql.caffein.entity.EmailAuth;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.jwt.JwtFilter;
import com.kql.caffein.jwt.TokenProvider;
import com.kql.caffein.service.EmailAuthService;
import com.kql.caffein.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Api(tags = {"User Controller"})
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final EmailAuthService emailAuthService;

    @ApiOperation(value = "회원 가입", response = String.class)
    @PostMapping()
    public ResponseEntity register(@Valid @RequestPart(value = "userDto") UserDto userDto,
                                                         @Valid @RequestPart(value = "userDetailDto") UserDetailDto userDetailDto,
                                                         @RequestPart(value = "multipartFile", required = false) MultipartFile multipartFile
    ) throws Exception {
        log.info("register called!!  user : {}", userDto);
        log.info("register called!! userDetailDto : {}", userDetailDto);

        try{
            if (multipartFile == null) {
                userService.register(userDto, userDetailDto);
            } else {
                userService.register(userDto, userDetailDto, multipartFile);
            }
//        Optional<UserDetail> userDetail = userService.findByUserId(userDetailDto.getUserId());
            return new ResponseEntity<String>("success", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("fail", HttpStatus.OK);
        }
    }

    @ApiOperation(value = "이메일 인증", response = String.class)
    @PostMapping("/emailCheck")
    public ResponseEntity<String> emailCheck(@RequestBody EmailAuthDto emailAuthDto) throws Exception {
        log.info("emailCheck called!! emailAuthDto: {}", emailAuthDto);
        try {
            emailAuthService.emailCheck(emailAuthDto);
            return new ResponseEntity<String>("success", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "코드 검증", response = Boolean.class)
    @PostMapping("/verifyCode")
    public ResponseEntity<Boolean> verifyCode(@RequestBody EmailAuthDto emailAuthDto) throws Exception {
        log.info("verifyCode called!! emailAuthDto: {}", emailAuthDto);
        try {
            //코드를 검증해서 맞다면 true, 틀리다면 false를 return
            return new ResponseEntity<Boolean>(emailAuthService.verifyCode(emailAuthDto), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Boolean>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "모든 회원 상세정보 조회", response = List.class)
    @GetMapping()
    public ResponseEntity<List<UserDetailDto>> userDetailList() throws Exception {
        log.info("userDetailList called!!");
        return new ResponseEntity<List<UserDetailDto>>(userService.getUsers(), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 한 명의 상세정보 조회", response = UserDetail.class)
    @GetMapping("/{userNo}")
    public ResponseEntity<UserDetailDto> getUser(@PathVariable @ApiParam(value = "유저 고유번호", required = true) String userNo) throws Exception {
        log.info("getUser called!! userNo : {}", userNo);
        return new ResponseEntity<UserDetailDto>(userService.getUser(userNo), HttpStatus.OK);
    }


    @ApiOperation(value = "회원 정보를 수정한다.", response = UserDetailDto.class)
    @PutMapping()
    public ResponseEntity<UserDetailDto> updateUser(@Valid @RequestPart(value = "userDetailDto") @ApiParam(value = "수정할 회원 정보", required = true) UserDetailDto userDetailDto,
                                                 @RequestPart(value = "multipartFile", required = false) @ApiParam(value = "프로필 사진") MultipartFile multipartFile) throws Exception {
        log.info("update user : {}", userDetailDto);
        if (multipartFile == null) {
            userService.updateUser(userDetailDto);
        } else {
            userService.updateUser(userDetailDto, multipartFile);
        }
        return new ResponseEntity<UserDetailDto>(userService.getUser(userDetailDto.getUserNo()), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 삭제", response = String.class)
    @DeleteMapping("/{userNo}")
    public ResponseEntity<String> deleteUser(@PathVariable @ApiParam(value = "삭제할 userNo", required = true) String userNo) {
        log.info("deleteUser called! userNo : {}", userNo);
        userService.deleteByUserNo(userNo);

        return new ResponseEntity<String>(userNo, HttpStatus.OK);
    }

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    public ResponseEntity login(@Valid @ApiParam(value = "email과 pass", required = true) @RequestBody UserLoginDto userLoginDto) throws Exception {
        log.info("login called!! userLoginDto: {}", userLoginDto);
        try {
            Token jwt = userService.login(userLoginDto);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

            //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
            return new ResponseEntity<>(jwt, httpHeaders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test")
    public ResponseEntity test() throws Exception {

            return new ResponseEntity<String>("test success", HttpStatus.OK);

    }

    @ApiOperation(value = "토큰 재발급")
    @PostMapping("/reissue")
    public ResponseEntity reissue(@ApiParam(value = "Access Token과 Refresh Token") @RequestBody Token token) throws Exception{
        log.info("reissue called!! Token: {}", token);
        try{
            return new ResponseEntity(userService.reissue(token), HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}