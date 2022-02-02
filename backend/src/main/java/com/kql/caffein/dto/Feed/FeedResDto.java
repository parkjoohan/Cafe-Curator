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
    @ApiModelProperty(value="피드 사진(파일)")
    private FileDto file;
    @ApiModelProperty(value="피드 좋아요 상태")
    private boolean liked;

    @Builder
    public FeedResDto(int feedNo, int likeCount, FileDto file, boolean liked){
        this.feedNo = feedNo;
        this.likeCount = likeCount;
        this.file = file;
        this.liked = liked;
    }
}