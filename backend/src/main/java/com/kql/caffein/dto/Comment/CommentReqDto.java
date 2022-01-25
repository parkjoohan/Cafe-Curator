package com.kql.caffein.dto.Comment;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class CommentReqDto {
    @ApiModelProperty(example = "피드 번호", required = true)
    private int feedNo;
    @ApiModelProperty(example = "작성자 고유 번호", required = true)
    private String userNo;
    @ApiModelProperty(example = "대댓글인 경우 부모 댓글 번호", required = false)
    private int parentNo;
    @ApiModelProperty(example = "댓글 내용", required = true)
    private String content;
}
