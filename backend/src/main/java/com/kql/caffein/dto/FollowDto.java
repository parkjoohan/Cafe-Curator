package com.kql.caffein.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FollowDto {

    @ApiModelProperty(value = "회원 고유번호")
    private String userNo;

    @ApiModelProperty(value = "회원 아이디")
    private String userId;

    @ApiModelProperty(value = "프로필 사진")
    private String picture;

    @ApiModelProperty(value = "팔로우 상태")
    private boolean status;
}
