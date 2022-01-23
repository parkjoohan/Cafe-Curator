package com.kql.caffein.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class FeedResDto {

    @ApiModelProperty(value="피드 번호")
    private int feedNo;
    @ApiModelProperty(value="피드 내용")
    private String content;
    @ApiModelProperty(value="피드 작성일")
    private LocalDateTime regTime;
    @ApiModelProperty(value="카페 아이디")
    private Integer cafeId;
    @ApiModelProperty(value="피드 카테고리 목록")
    private List<String> categoryList;
    @ApiModelProperty(value="피드 좋아요 수")
    private int likeCount;
    @ApiModelProperty(value="피드 작성자 아이디")
    private String userId;
    @ApiModelProperty(value="피드 사진(파일) 목록")
    private List<FileDto> files;
    @ApiModelProperty(value="피드 좋아요 상태")
    private boolean liked;
    @ApiModelProperty(value="피드 북마크 상태")
    private boolean marked;

    @Builder
    public FeedResDto(int feedNo, String content, LocalDateTime regTime, Integer cafeId, List<String> categoryList,
                      int likeCount, String userId, List<FileDto> files, boolean liked, boolean marked){
        this.feedNo = feedNo;
        this.content = content;
        this.regTime = regTime;
        this.cafeId = cafeId;
        this.categoryList = categoryList;
        this.likeCount = likeCount;
        this.userId = userId;
        this.files = files;
        this.liked = liked;
        this.marked = marked;
    }
}