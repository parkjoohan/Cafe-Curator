package com.kql.caffein.dto.Comment;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentResDto {
    @ApiModelProperty(example = "댓글 번호")
    private int commentNo;
    @ApiModelProperty(example = "작성자 아이디")
    private String userId;
    @ApiModelProperty(example = "대댓글인 경우 부모 댓글 작성자 아이디")
    private String parentId;
    @ApiModelProperty(example = "댓글 내용")
    private String content;
    @ApiModelProperty(example = "댓글 작성일")
    private String regTime;
    @ApiModelProperty(example = "댓글 좋아요 수")
    private int likeCount;
    @ApiModelProperty(example = "회원 본인이 좋아요 눌렀는지 확인")
    private boolean checkLike;

    @Builder
    public CommentResDto(int commentNo, String userId, String parentId, String content, String regTime, int likeCount, boolean checkLike) {
        this.commentNo = commentNo;
        this.userId = userId;
        this.parentId = parentId;
        this.content = content;
        this.regTime = regTime;
        this.likeCount = likeCount;
        this.checkLike = checkLike;
    }
}
