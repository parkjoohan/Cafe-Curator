package com.kql.caffein.dto.Feed;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class FeedDetailDto {

    @ApiModelProperty(value="피드 번호")
    private int feedNo;
    @ApiModelProperty(value="피드 내용")
    private String content;
    @ApiModelProperty(value="피드 작성일")
    private String regTime;
    @ApiModelProperty(value="카페 id")
    private Integer cafeId;
    @ApiModelProperty(value="카페 이름")
    private String cafeName;
    @ApiModelProperty(value="피드 카테고리 목록")
    private List<String> categoryList;
    @ApiModelProperty(value="피드 좋아요 수")
    private int likeCount;
    @ApiModelProperty(value="피드 댓글 수")
    private int commentCount;
    @ApiModelProperty(value="피드 작성자 아이디")
    private String userId;
    @ApiModelProperty(value="피드 작성자 사진")
    private String userPicture;
    @ApiModelProperty(value="피드 사진(파일) 목록")
    private List<FileDto> files;
    @ApiModelProperty(value="피드 좋아요 상태")
    private boolean liked;
    @ApiModelProperty(value="피드 북마크 상태")
    private boolean marked;

    @Builder
    public FeedDetailDto(int feedNo, String content, String regTime, Integer cafeId, String cafeName, List<String> categoryList,
                         int likeCount, int commentCount, String userId, String userPicture, List<FileDto> files, boolean liked, boolean marked){
        this.feedNo = feedNo;
        this.content = content;
        this.regTime = regTime;
        this.cafeId = cafeId;
        this.cafeName = cafeName;
        this.categoryList = categoryList;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.userId = userId;
        this.userPicture = userPicture;
        this.files = files;
        this.liked = liked;
        this.marked = marked;
    }
}