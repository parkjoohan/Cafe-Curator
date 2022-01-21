package com.kql.caffein.controller;

import com.kql.caffein.dto.Comment.CommentReqDto;
import com.kql.caffein.dto.Comment.CommentResDto;
import com.kql.caffein.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "댓글: 등록, 삭제, 조회, 좋아요")
@Slf4j
@RestController
@RequestMapping("/comment")
public class CommentController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    @ApiOperation(value = "댓글 등록")
    public ResponseEntity writeComment (@Validated @RequestBody CommentReqDto commentDto) {
        try {
            commentService.insertComment(commentDto);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{userNo}/{feedNo}")
    @ApiOperation(value = "피드에 달린 댓글 조회")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "feedNo", value = "피드 번호", required = true,
                    dataType = "int", paramType = "path")
    })
    public ResponseEntity listComment (@PathVariable String userNo, @PathVariable int feedNo) {
        try {
            List<CommentResDto> list = commentService.listComment(userNo, feedNo);
            if(list.isEmpty())
                return new ResponseEntity<>("댓글이 존재하지 않습니다.",HttpStatus.OK);
            else
                return new ResponseEntity<>(list,HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userNo}/{commentNo}")
    @ApiOperation(value = "댓글 삭제")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "commentNo", value = "댓글 번호", required = true,
                    dataType = "int", paramType = "path")
    })
    public ResponseEntity deleteComment (@PathVariable String userNo, @PathVariable int commentNo) {
        try {
            commentService.deleteComment(userNo, commentNo);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/like/{userNo}/{commentNo}")
    @ApiOperation(value = "댓글 좋아요 / 좋아요 취소")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "path"),
            @ApiImplicitParam(name = "commentNo", value = "댓글 번호", required = true,
                    dataType = "int", paramType = "path")
    })
    public ResponseEntity likeComment (@PathVariable String userNo, @PathVariable int commentNo){
        try {
            commentService.likeComment(userNo, commentNo);
            return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}