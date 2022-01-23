package com.kql.caffein.controller;

import com.kql.caffein.dto.FeedModifyDto;
import com.kql.caffein.dto.FeedRegisterDto;
import com.kql.caffein.dto.FeedResDto;
import com.kql.caffein.repository.FeedLikeRepository;
import com.kql.caffein.service.FeedServiceImpl;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("feed")
public class FeedController {

    @Autowired
    FeedServiceImpl feedService;

    @Autowired
    FeedLikeRepository feedLikeRepository;

    @ApiOperation(value = "피드 등록", notes = "이미지 파일 포함 필수, 확장자는 jpg 또는 png")
    @PostMapping
    public ResponseEntity<String> feedRegister(@RequestPart FeedRegisterDto feedDto,
                                               @RequestPart(value = "files") MultipartFile[] files) throws IOException{

        try{
            feedService.feedRegister(feedDto, files);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }catch (Exception e){
//            e.printStackTrace();
        }
        return new ResponseEntity<>("FAIL", HttpStatus.EXPECTATION_FAILED);
    }

    @ApiOperation(value = "피드 삭제", notes = "파일까지 모두 삭제")
    @DeleteMapping("{feedNo}/{userNo}")
    public ResponseEntity<String> feedDelete(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            feedService.feedDelete(feedNo, userNo);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e){
//            e.printStackTrace();
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    @ApiOperation(value = "피드 상세보기", notes = "feedNo에 해당하는 피드 반환")
    @GetMapping("detail/{feedNo}/{userNo}")
    public ResponseEntity feedDetail(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            FeedResDto feedDto = feedService.feedDetail(feedNo, userNo);
            return new ResponseEntity<>(feedDto, HttpStatus.OK);
        }catch (Exception e){
//            e.printStackTrace();
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    @ApiOperation(value = "피드 목록(feeds 테이블)", notes = "", response = List.class)
    @GetMapping("feedList/{feedUserNo}/{userNo}")
    public ResponseEntity feedListByTable(@ApiParam(value = "조회할 유저")@PathVariable String feedUserNo,
                                          @ApiParam(value = "조회하는 유저")@PathVariable String userNo){
        try{
            return new ResponseEntity<>(feedService.feedListByTable(feedUserNo, userNo), HttpStatus.OK);
        }catch (Exception e){
//            e.printStackTrace();
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    @ApiOperation(value = "피드 목록(userNo)", notes = "", response = List.class)
    @GetMapping("feedList2/{feedUserNo}/{userNo}")
    public ResponseEntity feedList(@ApiParam(value = "조회할 유저")@PathVariable String feedUserNo,
                                   @ApiParam(value = "조회하는 유저")@PathVariable String userNo){
        try{
            return new ResponseEntity<>(feedService.feedList(feedUserNo, userNo), HttpStatus.OK);
        }catch (Exception e){
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    @ApiOperation(value = " 피드 좋아요 컨트롤", notes="좋아요 등록, 삭제")
    @GetMapping("/like/{feedNo}/{userNo}")
    public ResponseEntity<String> feedLikeControl(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            String msg = feedService.feedLikeControl(feedNo, userNo);
            return new ResponseEntity<>("SUCCESS : " + msg, HttpStatus.OK);
        }catch (Exception e){
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    @ApiOperation(value = "게시글 수정")
    @PutMapping("{userNo}")
    public ResponseEntity<String> feedModify(@PathVariable String userNo, @RequestPart FeedModifyDto feedDto,
                                             @RequestPart(value = "files", required = false) MultipartFile[] files) throws IOException{

        try{
            feedService.feedModify(userNo, feedDto, files);
            System.out.println("피드 수정 성공 >> " + feedDto);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }catch (Exception e){
//            e.printStackTrace();
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.OK);
        }
//        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    @ApiOperation(value = " 피드 북마크 컨트롤", notes="북마크 등록, 삭제")
    @GetMapping("/bookmark/{feedNo}/{userNo}")
    public ResponseEntity<String> feedBookmarkControl(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            String msg = feedService.feedBookmarkControl(feedNo, userNo);
            return new ResponseEntity<>("SUCCESS : " + msg, HttpStatus.OK);
        }catch (Exception e){
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }

    @ApiOperation(value = "북마크한 피드 목록", notes = "", response = List.class)
    @GetMapping("bookmarkList/{userNo}")
    public ResponseEntity bookmarkList(@PathVariable String userNo){
        try{
            return new ResponseEntity<>(feedService.bookmarkList(userNo), HttpStatus.OK);
        }catch (Exception e){
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    }
}