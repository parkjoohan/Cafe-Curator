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

@Slf4j
@Api(tags = {"User Controller"})
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final EmailAuthService emailAuthService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @ApiOperation(value = "회원 가입", response = String.class)
    @PostMapping()
    public ResponseEntity<Optional<UserDetail>> register(@Valid @RequestPart(value = "userDto") UserDto userDto,
                                                         @Valid @RequestPart(value = "userDetailDto") UserDetailDto userDetailDto,
                                                         @RequestPart(value = "multipartFile", required = false) MultipartFile multipartFile
    ) throws Exception {
        log.info("register user : {}", userDto);
        log.info("register userDetailDto : {}", userDetailDto);
        log.info("register multipartFile : {}", multipartFile);
        if (multipartFile == null) {
            userService.register(userDto, userDetailDto);
        } else {
            userService.register(userDto, userDetailDto, multipartFile);
        }
        Optional<UserDetail> userDetail = userService.findByUserId(userDetailDto.getUserId());
        return new ResponseEntity<Optional<UserDetail>>(userDetail, HttpStatus.OK);
    }

    @ApiOperation(value = "이메일 인증", response = EmailAuth.class)
    @PostMapping("/emailCheck")
    public ResponseEntity<EmailAuth> verifyCode(@RequestBody EmailAuthDto emailAuthDto) throws Exception {
        log.info("verifyCode called!! emailAuthDto: {}", emailAuthDto);
        if (emailAuthService.verifyCode(emailAuthDto) == true) {
            return new ResponseEntity<EmailAuth>(emailAuthService.findByUserNo(emailAuthDto.getUserNo()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "모든 회원 상세정보 조회", response = List.class)
    @GetMapping()
    public ResponseEntity<List<UserDetail>> userDetailList() throws Exception {
        log.info("userDetailList called!!");
        return new ResponseEntity<List<UserDetail>>(userService.findAll(), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 한 명의 상세정보 조회", response = UserDetail.class)
    @GetMapping("/{userNo}")
    public ResponseEntity<UserDetail> getUser(@PathVariable @ApiParam(value = "유저 고유번호", required = true) String userNo) throws Exception {
        log.info("getUser called!! userNo : {}", userNo);
        return new ResponseEntity<UserDetail>(userService.findByUserNo(userNo), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 정보를 수정한다.", response = UserDetail.class)
    @PutMapping()
    public ResponseEntity<UserDetail> updateUser(@Valid @RequestPart(value = "userDetailDto") @ApiParam(value = "수정할 회원 정보", required = true) UserDetailDto userDetailDto,
                                                 @RequestPart(value = "multipartFile", required = false) @ApiParam(value = "프로필 사진") MultipartFile multipartFile) throws Exception {
        log.info("update user : {}", userDetailDto);
        if (multipartFile == null) {
            userService.updateUser(userDetailDto);
        } else {
            userService.updateUser(userDetailDto, multipartFile);
        }
        UserDetail userDetail = userService.findByUserNo(userDetailDto.getUserNo());
        return new ResponseEntity<UserDetail>(userDetail, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 삭제", response = String.class)
    @DeleteMapping("/{userNo}")
    public ResponseEntity<String> deleteUser(@PathVariable @ApiParam(value = "삭제할 userNo", required = true) String userNo) {
        log.info("deleteUser called! userNo : {}", userNo);
        userService.deleteByUserNo(userNo);

        return new ResponseEntity<String>(userNo, HttpStatus.OK);
    }

    @ApiOperation(value = "로그인", response = Token.class)
    @PostMapping("/login")
    public ResponseEntity<Token> login(@Valid @ApiParam(value = "email과 pass", required = true) @RequestBody UserLoginDto userLoginDto) throws Exception {
        log.info("login called!! userLoginDto: {}", userLoginDto);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPass());

        //유저 정보를 조회하여 인증 정보를 생성
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        //해당 인증 정보를 현재 실행중인 스레드(Security Context)에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //해당 인증 정보를 기반으로 jwt 토큰을 생성
        String jwt = tokenProvider.createToken(authentication);
        log.info("로그인 토큰정보 : {}", jwt);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
        return new ResponseEntity<>(new Token(jwt), httpHeaders, HttpStatus.OK);
    }
}