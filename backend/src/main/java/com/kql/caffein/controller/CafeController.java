package com.kql.caffein.controller;

import com.kql.caffein.entity.Cafe;
import com.kql.caffein.service.CafeService;
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
import java.util.Optional;

@Api(value = "카페")
@Slf4j
@RestController
@RequestMapping("/cafe")
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class CafeController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final CafeService cafeService;

    @Autowired
    public CafeController(CafeService cafeService) {
        this.cafeService = cafeService;
    }

    @ApiOperation(value = "카페 아이디 받아오기")
    @GetMapping
    @ApiImplicitParams({
            @ApiImplicitParam(name = "cafeX", value = "경도", required = true,
                    dataType = "double", paramType = "query"),
            @ApiImplicitParam(name = "cafeY", value = "위도", required = true,
                    dataType = "double", paramType = "query")
    })
    public ResponseEntity getCafeId (@RequestParam(value = "cafeX") double cafeX,
                                     @RequestParam(value = "cafeY") double cafeY) {
        try {
            Optional<Cafe> cafe = cafeService.getCafe(String.valueOf(cafeX), String.valueOf(cafeY));
            if(cafe.isPresent())
                return new ResponseEntity<>(cafe.get().getCafeId(), HttpStatus.OK);
            else
                return new ResponseEntity<>("empty",HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(FAIL, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
