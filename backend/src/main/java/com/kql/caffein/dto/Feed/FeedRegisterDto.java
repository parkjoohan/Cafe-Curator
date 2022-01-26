package com.kql.caffein.dto.Feed;

import com.kql.caffein.entity.Feed.Feed;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FeedRegisterDto {

    @ApiModelProperty(value="피드 내용")
    private String content;
    @ApiModelProperty(value="카페 이름")
    private String cafeName;
    @ApiModelProperty(value="피드 카테고리 목록")
    private List<String> categoryList;
    @ApiModelProperty(value="피드 작성자 번호")
    private String userNo;

    public Feed toEntity(){
        return Feed.builder()
                .content(content)
                .cafeName(cafeName)
                .categoryList(categoryList)
                .userNo(userNo)
                .build();
    }
}