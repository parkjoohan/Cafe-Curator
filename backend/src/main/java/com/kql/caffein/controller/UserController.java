package com.kql.caffein.controller;

import com.kql.caffein.dto.*;
import com.kql.caffein.dto.Email.EmailAuthDto;
import com.kql.caffein.dto.User.*;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.jwt.JwtFilter;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.repository.UserRepository;
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

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;

    @ApiOperation(value = "이메일 인증", response = String.class)
    @PostMapping("/emailCheck")
    public ResponseEntity<String> emailCheck(@RequestBody EmailAuthDto emailAuthDto) {
        log.info("emailCheck called!! emailAuthDto: {}", emailAuthDto);
        try {
            emailAuthService.emailCheck(emailAuthDto);
            return new ResponseEntity<String>("success", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "코드 검증")
    @PostMapping("/verifyCode")
    public ResponseEntity verifyCode(@RequestBody EmailAuthDto emailAuthDto){
        log.info("verifyCode called!! emailAuthDto: {}", emailAuthDto);
        try {
            //코드를 검증해서 맞다면 true, 틀리다면 false를 return
            return new ResponseEntity<Boolean>(emailAuthService.verifyCode(emailAuthDto), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "회원 가입", response = String.class)
    @PostMapping()
    public ResponseEntity register(@Valid @RequestPart(value = "userDto") UserDto userDto,
                                                         @Valid @RequestPart(value = "userDetailDto") UserDetailDto userDetailDto,
                                                         @RequestPart(value = "multipartFile", required = false) MultipartFile multipartFile){
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
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "계정 - 회원 부분 조회")
    @GetMapping("/account/{userId}")
    public ResponseEntity getUserAccount(@PathVariable @ApiParam(value = "유저 아이디", required = true) String userId) throws Exception {
        log.info("getUser called!! userId : {}", userId);
        try{
            return new ResponseEntity<UserAccountDto>(userService.getUserAccount(userId), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "회원의 수정할 정보 조회")
    @GetMapping("/{userNo}")
    public ResponseEntity getUser(@PathVariable @ApiParam(value = "유저 고유번호", required = true) String userNo) throws Exception {
        log.info("getUser called!! userNo : {}", userNo);
        try{
            return new ResponseEntity<UserUpdateDto>(userService.getUser(userNo), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "모든 회원 상세정보 조회")
    @GetMapping()
    public ResponseEntity userDetailList() throws Exception {
        log.info("userDetailList called!!");
        try{
            return new ResponseEntity<List<UserDetailDto>>(userService.getUsers(), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "회원 정보 수정")
    @PutMapping()
    public ResponseEntity updateUser(@Valid @RequestPart(value = "userDetailDto") @ApiParam(value = "수정할 회원 정보", required = true) UserDetailDto userDetailDto,
                                                 @RequestPart(value = "multipartFile", required = false) @ApiParam(value = "프로필 사진") MultipartFile multipartFile) throws Exception {
        log.info("update user : {}", userDetailDto);
        try{
            if (multipartFile == null) {
                userService.updateUser(userDetailDto);
            } else {
                userService.updateUser(userDetailDto, multipartFile);
            }
            return new ResponseEntity<UserUpdateDto>(userService.getUser(userDetailDto.getUserNo()), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @ApiOperation(value = "회원 삭제", response = String.class)
    @DeleteMapping("/{userNo}")
    public ResponseEntity<String> deleteUser(@PathVariable @ApiParam(value = "삭제할 userNo", required = true) String userNo) {
        log.info("deleteUser called! userNo : {}", userNo);
        try{
            userService.deleteByUserNo(userNo);
            return new ResponseEntity<String>("success", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "로그인")
    @PostMapping("/login")
    public ResponseEntity login(@Valid @ApiParam(value = "email과 pass", required = true) @RequestBody UserLoginDto userLoginDto) throws Exception {
        log.info("login called!! userLoginDto: {}", userLoginDto);
        try {
            Map<String, String> map = new HashMap<>();
            Optional<User> user = userRepository.findByEmail(userLoginDto.getEmail());
            Token jwt = userService.login(userLoginDto);

            if(user.isPresent()) {
                UserDetail userDetail = userDetailRepository.findByUserNo(user.get().getUserNo());
                map.put("userNo", userDetail.getUserNo());
                map.put("userId", userDetail.getUserId());
                map.put("picture", userDetail.getPicture());
                map.put("accessToken", jwt.getAccessToken());
                map.put("refreshToken", jwt.getRefreshToken());
                map.put("refreshTokenExpirationTime", jwt.getRefreshTokenExpirationTime().toString());
            }
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

            //생성된 Token을 Response Header에 넣고, Token vo 객체를 이용해 Response Body에도 넣어서 리턴
            return new ResponseEntity<>(map, httpHeaders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @ApiOperation(value = "비밀번호 찾기 - 메일 전송(코드)")
    @PostMapping("/findPassSendEmail/{email}")
    public ResponseEntity findPass(@ApiParam(value = "email") @PathVariable String email) throws Exception{
        log.info("findPass called!! userNo: {}", email);
        try{
            Optional<User> user = userService.findByEmail(email);
            //회원이 존재하지 않을 때
            if(!user.isPresent()){
                return new ResponseEntity<String>("가입된 회원이 아닙니다.", HttpStatus.BAD_REQUEST);
            }
            //유저의 oauth_type
            String oauth_type = user.get().getOauthType();

            //자체 회원가입으로 가입한 유저가 아닐 때
            if(!oauth_type.equals("kql")){
                return new ResponseEntity<String>("자체 회원가입으로 가입한 유저가 아닙니다.", HttpStatus.BAD_REQUEST);
            }
            emailAuthService.findPassSendEmail(email);
            return new ResponseEntity<String>("success", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation("비밀번호 업데이트")
    @PostMapping("updatePass")
    public ResponseEntity updatePass(@ApiParam(value = "email과 pass") @RequestBody UserUpdatePassDto userUpdatePassDto) throws Exception{
        log.info("updatePass called!! UserUpdatePassDto: {}", userUpdatePassDto);
        try{
            userService.updatePass(userUpdatePassDto);
            return new ResponseEntity<String>("success", HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("fail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/test")
    public ResponseEntity test() throws Exception {
            return new ResponseEntity<String>("test success", HttpStatus.OK);
    }
}