package com.kql.caffein.controller;

import com.kql.caffein.service.FollowService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "팔로우")
@Slf4j
@RestController
public class FollowController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final FollowService followService;

    @Autowired
    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @GetMapping("/checkFollow/{userNo}/{followNo}")
    @ApiOperation(value = "팔로우 여부 확인")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "followNo", value = "팔로우 여부 확인할 계정의 고유 번호", required = true,
                    dataType = "string", paramType = "path")
    })
    public ResponseEntity statusFollow(@PathVariable String userNo, @PathVariable String followNo) {
        try {
            Boolean check = followService.checkFollow(userNo, followNo);
            return new ResponseEntity<>(check,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/follow/{userNo}/{followNo}")
    @ApiOperation(value = "팔로우")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "followNo", value = "팔로우/언팔로우 할 계정의 고유 번호", required = true,
                    dataType = "string", paramType = "path")
    })
    public ResponseEntity follow(@PathVariable String userNo, @PathVariable String followNo) {
        try {
            followService.follow(userNo, followNo);
            return new ResponseEntity<>(SUCCESS,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/follower")
    @ApiOperation(value = "팔로워 목록")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "lastUserNo", value = "마지막 회원 번호", required = false,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "화면에 보여질 사이즈", required = true,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity follower (@RequestParam(value = "userNo") String userNo,
                                    @RequestParam(value = "lastUserNo", required = false) String lastUserNo,
                                    @RequestParam int size) {
        try {
            return new ResponseEntity<>(followService.followerList(userNo, lastUserNo, size),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/following")
    @ApiOperation(value = "팔로잉 목록")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "lastUserNo", value = "마지막 회원 번호", required = false,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "화면에 보여질 사이즈", required = true,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity following (@RequestParam(value = "userNo") String userNo,
                                    @RequestParam(value = "lastUserNo", required = false) String lastUserNo,
                                    @RequestParam int size) {
        try {
            return new ResponseEntity<>(followService.followingList(userNo, lastUserNo, size),HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
