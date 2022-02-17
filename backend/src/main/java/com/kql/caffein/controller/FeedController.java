package com.kql.caffein.controller;

import com.kql.caffein.dto.Feed.FeedModifyDto;
import com.kql.caffein.dto.Feed.FeedRegisterDto;
import com.kql.caffein.dto.Feed.FeedDetailDto;
import com.kql.caffein.dto.FollowDto;
import com.kql.caffein.repository.FeedLikeRepository;
import com.kql.caffein.service.Impl.FeedServiceImpl;
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
@CrossOrigin(origins = {"*"}, maxAge = 6000)
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
            e.printStackTrace();
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.OK);
        }
    }

    @ApiOperation(value = "피드 삭제", notes = "파일까지 모두 삭제")
    @DeleteMapping("{feedNo}/{userNo}")
    public ResponseEntity<String> feedDelete(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            feedService.feedDelete(feedNo, userNo);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "피드 상세보기", notes = "feedNo에 해당하는 피드 반환")
    @GetMapping("detail/{feedNo}/{userNo}")
    public ResponseEntity feedDetail(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            FeedDetailDto feedDto = feedService.feedDetail(feedNo, userNo);
            return new ResponseEntity<>(feedDto, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "피드 수정", notes="삭제한 파일 번호를 feedDto의 deleteList에 포함해서 요청, 삭제하는 파일이 없는 경우 빈 리스트로")
    @PutMapping("{userNo}")
    public ResponseEntity<String> feedModify(@PathVariable String userNo, @RequestPart FeedModifyDto feedDto,
                                             @RequestPart(value = "files", required = false) MultipartFile[] files) throws IOException{

        try{
            feedService.feedModify(userNo, feedDto, files);
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = " 피드 좋아요 컨트롤", notes="좋아요 등록, 삭제")
    @GetMapping("/like/{feedNo}/{userNo}")
    public ResponseEntity<String> feedLikeControl(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            String msg = feedService.feedLikeControl(feedNo, userNo);
            return new ResponseEntity<>("SUCCESS : " + msg, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "피드 북마크 컨트롤", notes="북마크 등록, 삭제")
    @GetMapping("/bookmark/{feedNo}/{userNo}")
    public ResponseEntity<String> feedBookmarkControl(@PathVariable int feedNo, @PathVariable String userNo){

        try{
            String msg = feedService.feedBookmarkControl(feedNo, userNo);
            return new ResponseEntity<>("SUCCESS : " + msg, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @ApiOperation(value = "개인 피드 목록", notes = "비회원도 조회 가능")
    @GetMapping(value={"feedList/{feedUserNo}","feedList/{feedUserNo}/{userNo}"})
    public ResponseEntity feedListWithPaging(@ApiParam(value = "조회할 유저", required = true)@PathVariable String feedUserNo,
                                   @ApiParam(value = "조회하는 유저") @PathVariable(required = false) String userNo,
                                   @ApiParam(value = "타입(feed 또는 blog)", required = true)@RequestParam String type,
                                   @RequestParam(required = false) Integer lastFeedNo, @RequestParam int size) {
        try{
            return new ResponseEntity<>(feedService.feedListWithPaging(feedUserNo, userNo,type, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "북마크 목록")
    @GetMapping("bookmarkList/{userNo}")
    public ResponseEntity bookmarkListWithPaging(@PathVariable String userNo, @ApiParam(value = "타입(feed 또는 blog)", required = true)@RequestParam String type,
                                                 @RequestParam(required = false) Integer lastFeedNo, @RequestParam int size) {
        try{
            return new ResponseEntity<>(feedService.bookmarkListWithPaging(userNo, type, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "좋아요 목록")
    @GetMapping("likeList/{userNo}")
    public ResponseEntity likeListWithPaging(@PathVariable String userNo, @ApiParam(value = "타입(feed 또는 blog)", required = true)@RequestParam String type,
                                             @RequestParam(required = false) Integer lastFeedNo, @RequestParam int size) {
        try{
            return new ResponseEntity<>(feedService.likeListWithPaging(userNo, type, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ApiOperation(value = "메인 피드 목록", notes = "본인 게시물 + 팔로잉 게시물 + 관심사 게시물 / 비회원은 랜덤 게시물")
    @GetMapping(value={"mainFeedList", "mainFeedList/{userNo}"})
    public ResponseEntity mainFeedListWithPaging(@PathVariable(required = false) String userNo,
                                                 @ApiParam(value = "타입(feed 또는 blog)", required = true)@RequestParam String type,
                                                 @RequestParam(required = false) Integer lastFeedNo, @RequestParam int size) {
        try{
            return new ResponseEntity<>(feedService.mainFeedListWithPaging(userNo, type, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("likeUserList")
    @ApiOperation(value = "피드 좋아요 누른 회원 목록")
    public ResponseEntity feedLikeUserList (@RequestParam(value = "userNo") String userNo, @RequestParam int feedNo,
                                            @RequestParam(required = false) String lastUserNo, @RequestParam int size) {
        try {
            List<FollowDto> list = feedService.feedLikeUserList(userNo, feedNo, lastUserNo, size);
            return new ResponseEntity<>(list,HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("FAIL : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}