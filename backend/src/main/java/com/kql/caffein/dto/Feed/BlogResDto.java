package com.kql.caffein.dto.Feed;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class BlogResDto {

    @ApiModelProperty(value="피드 번호")
    private int feedNo;
    @ApiModelProperty(value="피드 내용")
    private String content;
    @ApiModelProperty(value="카페 이름")
    private String cafeName;
    @ApiModelProperty(value="피드 카테고리 목록")
    private List<String> categoryList;
    @ApiModelProperty(value="피드 좋아요 수")
    private int likeCount;
    @ApiModelProperty(value="피드 작성자 아이디")
    private String userId;
    @ApiModelProperty(value="피드 작성자 사진")
    private String userPicture;
    @ApiModelProperty(value="피드 사진(파일)")
    private FileDto file;
    @ApiModelProperty(value="피드 좋아요 상태")
    private boolean liked;
    @ApiModelProperty(value="피드 북마크 상태")
    private boolean marked;

    @Builder
    public BlogResDto(int feedNo, String content, String cafeName, List<String> categoryList,
                      int likeCount, String userId, String userPicture, FileDto file, boolean liked, boolean marked){
        this.feedNo = feedNo;
        this.content = content;
        this.cafeName = cafeName;
        this.categoryList = categoryList;
        this.likeCount = likeCount;
        this.userId = userId;
        this.userPicture = userPicture;
        this.file = file;
        this.liked = liked;
        this.marked = marked;
    }
}