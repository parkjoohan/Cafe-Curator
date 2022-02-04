package com.kql.caffein.controller;

import com.kql.caffein.dto.Feed.FeedResDto;
import com.kql.caffein.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "팔로우")
@Slf4j
@RestController
@RequestMapping("/search")
public class SearchController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final SearchService searchService;

    @Autowired
    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/category/top")
    @ApiOperation(value = "카테고리 검색 - 인기순")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "category", value = "카테고리", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "lastLikeCount", value = "화면에 보여진 마지막 좋아요 수", required = false,
                    dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "lastFeedNo", value = "화면에 보여진 마지막 피드 번호", required = false,
                    dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "화면에 보여질 사이즈", required = true,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity categoryTopController (@RequestParam(value = "userNo") String userNo,
                                                 @RequestParam(value = "category") String category,
                                                 @RequestParam(required = false) Integer lastLikeCount,
                                                 @RequestParam(required = false) Integer lastFeedNo,
                                                 @RequestParam int size) {
        try {
            return new ResponseEntity<>(searchService.categorySearchTopWithPaging(userNo, category, lastLikeCount, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/category/recent")
    @ApiOperation(value = "카테고리 검색 - 최신순")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "category", value = "카테고리", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "lastFeedNo", value = "화면에 보여진 마지막 피드 번호", required = false,
                    dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "화면에 보여질 사이즈", required = true,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity categoryRecentController (@RequestParam(value = "userNo") String userNo,
                                                 @RequestParam(value = "category") String category,
                                                 @RequestParam(required = false) Integer lastFeedNo,
                                                 @RequestParam int size) {
        try {
            return new ResponseEntity<>(searchService.categorySearchRecentWithPaging(userNo, category, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/cafe")
    @ApiOperation(value = "카페 검색")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "cafeName", value = "카페명", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "lastFeedNo", value = "화면에 보여진 마지막 피드 번호", required = false,
                    dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "화면에 보여질 사이즈", required = true,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity cafeSearchController (@RequestParam(value = "userNo") String userNo,
                                                    @RequestParam(value = "cafeName") String cafeName,
                                                    @RequestParam(required = false) Integer lastFeedNo,
                                                    @RequestParam int size) {
        try {
            return new ResponseEntity<>(searchService.cafeSearchWithPaging(userNo, cafeName, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
