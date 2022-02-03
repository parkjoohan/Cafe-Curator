package com.kql.caffein.dto;

import com.kql.caffein.dto.Feed.FeedResDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;

import java.util.List;
import java.util.Set;

@Builder
public class CafeSearchDto {
    @ApiModelProperty(example = "상위 키워드 2개")
    private Set<String> categoryList;

    @ApiModelProperty(example = "해당 카페를 등록한 피드 목록")
    private List<FeedResDto> feedList;
}
