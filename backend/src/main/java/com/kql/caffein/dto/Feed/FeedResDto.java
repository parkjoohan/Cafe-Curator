package com.kql.caffein.dto.Feed;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FeedResDto {

    @ApiModelProperty(value="피드 번호")
    private int feedNo;
    @ApiModelProperty(value="피드 좋아요 수")
    private int likeCount;
    @ApiModelProperty(value="피드 댓글 수")
    private int commentCount;
    @ApiModelProperty(value="피드 사진(파일)")
    private FileDto file;
    @ApiModelProperty(value="피드 좋아요 상태")
    private boolean liked;
    @ApiModelProperty(value="피드 북마크 상태")
    private boolean marked;

    @Builder
    public FeedResDto(int feedNo, int likeCount, int commentCount, FileDto file, boolean liked, boolean marked){
        this.feedNo = feedNo;
        this.likeCount = likeCount;
        this.commentCount = commentCount;
        this.file = file;
        this.liked = liked;
        this.marked = marked;
    }
}