package com.kql.caffein.dto.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@ToString
@ApiModel(value = "UserDto : 회원정보", description = "회원정보 중 수정되지 않는 정보")
public class UserDto {
    @Column(length = 13)
    @ApiModelProperty(value = "회원 고유번호")
    private String userNo;

    @NotNull
    @Size(max = 30)
    @ApiModelProperty(value = "이메일")
    private String email;

    @ApiModelProperty(value = "가입 날짜")
    private String joinDate;

    @ApiModelProperty(value = "회원가입 구분")
    private String oauthType;

    @Size(min = 5, max = 10)
    @ApiModelProperty(value = "회원 권한")
    private String role;
}
