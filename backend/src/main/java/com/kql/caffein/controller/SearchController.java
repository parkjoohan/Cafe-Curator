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

    @GetMapping("/category")
    @ApiOperation(value = "카테고리 검색")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "userNo", value = "회원 고유 번호", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "category", value = "카테고리", required = true,
                    dataType = "string", paramType = "query"),
            @ApiImplicitParam(name = "order", value = "정렬 방법", required = true,
                    dataType = "string", paramType = "query", example = "top/recent"),
            @ApiImplicitParam(name = "size", value = "화면에 보여질 사이즈", required = true,
                    dataType = "int", paramType = "query")
    })
    public ResponseEntity follower (@RequestParam(value = "userNo") String userNo,
                                    @RequestParam(value = "category") String category,
                                    @RequestParam(value = "order") String order,
                                    @RequestParam int size) {
        try {
            return new ResponseEntity<>(searchService.categorySearchWithPaging(userNo, category, order, size), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
