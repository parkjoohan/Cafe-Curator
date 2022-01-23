package com.kql.caffein.dto;

import com.kql.caffein.entity.Feed;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FeedModifyDto {

    @ApiModelProperty(value="피드 번호")
    private int feedNo;
    @ApiModelProperty(value="피드 내용")
    private String content;
    @ApiModelProperty(value="카페 아이디")
    private Integer cafeId;
    @ApiModelProperty(value="피드 카테고리 목록")
    private List<String> categoryList;
    @ApiModelProperty(value="기존 사진 중에 삭제한 사진의 fileNo")
    private List<Integer> deleteList;
}