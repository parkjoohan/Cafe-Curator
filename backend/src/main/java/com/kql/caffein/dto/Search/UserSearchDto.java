package com.kql.caffein.dto.Search;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserSearchDto {
    @ApiModelProperty(example = "회원 아이디")
    private String userId;

    @ApiModelProperty(value = "프로필 사진")
    private String picture;

    @ApiModelProperty(value = "팔로워 수")
    private int followerCount;

    @ApiModelProperty(value = "팔로잉 수")
    private int followingCount;

    @Builder
    public UserSearchDto(String userId, String picture, int followerCount, int followingCount) {
        this.userId = userId;
        this.picture = picture;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
    }
}
