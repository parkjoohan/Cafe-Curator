package com.kql.caffein.controller;

import com.kql.caffein.dto.UserDetailDto;
import com.kql.caffein.dto.UserDto;
import com.kql.caffein.entity.User;
import com.kql.caffein.entity.UserDetail;
import com.kql.caffein.jwt.TokenProvider;
import com.kql.caffein.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
        if(multipartFile == null){
            userService.register(userDto, userDetailDto);
        } else{
            userService.register(userDto, userDetailDto, multipartFile);
        }
        Optional<UserDetail> userDetail = userService.findByUserId(userDetailDto.getUserId());
        return new ResponseEntity<Optional<UserDetail>>(userDetail, HttpStatus.OK);
    }

    @ApiOperation(value = "이메일 인증", response = String.class)
    @GetMapping("/emailCheck/{email}")
    public ResponseEntity<String> emailCheck(@PathVariable @ApiParam(value = "유저 이메일", required = true) String email) throws Exception{
        log.info("emailCheck called!! email : {}",email);
        userService.findByEmail(email);

        return new ResponseEntity<String>(HttpStatus.OK);
    }

    @ApiOperation(value = "모든 회원 상세정보 조회", response = List.class)
    @GetMapping()
    public ResponseEntity<List<UserDetail>> userDetailList() throws Exception{
        log.info("userDetailList called!!");
        return new ResponseEntity<List<UserDetail>>(userService.findAll(), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 한 명의 상세정보 조회", response = UserDetail.class)
    @GetMapping("/{userNo}")
    public ResponseEntity<UserDetail> getUser(@PathVariable @ApiParam(value = "유저 고유번호", required = true) String userNo) throws Exception{
        log.info("getUser called!! userNo : {}", userNo);
        return new ResponseEntity<UserDetail>(userService.findByUserNo(userNo), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 정보를 수정한다.", response = UserDetail.class)
    @PutMapping()
    public ResponseEntity<UserDetail> updateUser(@Valid @RequestPart(value = "userDetailDto") @ApiParam(value = "수정할 회원 정보", required = true) UserDetailDto userDetailDto,
                                                 @RequestPart(value = "multipartFile", required = false) @ApiParam(value = "프로필 사진") MultipartFile multipartFile) throws Exception{
        log.info("update user : {}", userDetailDto);
        if(multipartFile == null){
            userService.updateUser(userDetailDto);
        } else{
            userService.updateUser(userDetailDto, multipartFile);
        }
        UserDetail userDetail = userService.findByUserNo(userDetailDto.getUserNo());
        return new ResponseEntity<UserDetail>(userDetail, HttpStatus.OK);
    }

    @ApiOperation(value = "회원 삭제", response = String.class)
    @DeleteMapping("/{userNo}")
    public ResponseEntity<String> deleteUser(@PathVariable @ApiParam(value = "삭제할 userNo", required = true) String userNo){
        log.info("deleteUser called! userNo : {}", userNo);
        userService.deleteByUserNo(userNo);

        return new ResponseEntity<String>(userNo, HttpStatus.OK);
    }

}
