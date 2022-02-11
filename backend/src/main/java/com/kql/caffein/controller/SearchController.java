package com.kql.caffein.controller;

import com.kql.caffein.dto.Search.CafeSearchReqDto;
import com.kql.caffein.service.CafeService;
import com.kql.caffein.service.SearchService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Api(value = "팔로우")
@Slf4j
@RestController
@RequestMapping("/search")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class SearchController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final SearchService searchService;
    private final CafeService cafeService;

    @Autowired
    public SearchController(SearchService searchService, CafeService cafeService) {
        this.searchService = searchService;
        this.cafeService = cafeService;
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
    @ApiOperation(value = "카페 아이디로 검색")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "cafeId", value = "카페 고유 번호", required = true,
                    dataType = "int", paramType = "query"),
            @ApiImplicitParam(name = "lastFeedNo", value = "화면에 보여진 마지막 피드 번호", required = false,
                    dataType = "Integer", paramType = "query"),
            @ApiImplicitParam(name = "size", value = "화면에 보여질 사이즈", required = true,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity cafeSearchController (@RequestParam(value = "userNo") String userNo,
                                                    @RequestParam(value = "cafeId") int cafeId,
                                                    @RequestParam(required = false) Integer lastFeedNo,
                                                    @RequestParam int size) {
        try {
            return new ResponseEntity<>(searchService.cafeSearchWithPaging(userNo, cafeId, lastFeedNo, size), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/cafeList")
    @ApiOperation(value = "카테 목록으로 검색")
    public ResponseEntity cafeListSearch(@RequestBody CafeSearchReqDto cafeSearchReqDto) {
        try {
            return new ResponseEntity<>(searchService.cafeListSearchWithPaging(cafeSearchReqDto), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
