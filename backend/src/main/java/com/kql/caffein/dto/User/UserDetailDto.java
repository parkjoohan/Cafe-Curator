package com.kql.caffein.dto.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
@ApiModel(value = "UserDetailDto : 회원 상세정보", description = "회원정보 중 수정될 수 있는 정보")
public class UserDetailDto {
    @EmbeddedId
    @Column(length = 13)
    @ApiModelProperty(value = "회원 고유번호")
    private String userNo;

    @NotNull
    @Size(max = 10)
    @ApiModelProperty(value = "회원 아이디")
    private String userId;

    @Size(min = 3, max = 70)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ApiModelProperty(value = "회원 비밀번호")
    private String pass;

    @Size(max = 100)
    @ApiModelProperty(value = "자기소개")
    private String introduction;

    @ApiModelProperty(value = "프로필 사진")
    private String picture;

    @ApiModelProperty(value = "카테고리")
    private List<String> categoryList;

    @ApiModelProperty(value = "팔로워 수")
    private int followerCount;

    @ApiModelProperty(value = "팔로잉 수")
    private int followingCount;
}
