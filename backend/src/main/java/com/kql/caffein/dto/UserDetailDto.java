package com.kql.caffein.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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

    @ApiModelProperty(value = "리프레시 토큰")
    private String refreshToken;

    @ApiModelProperty(value = "카테고리")
    private String categoryList;
}
