package com.kql.caffein.dto.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@ToString
@ApiModel(value = "UserLoginDto : 로그인시 필요한 회원 정보", description = "로그인 시 필요한 회원 정보인 email, password를 나타낸다.")
public class UserLoginDto {
    @NotNull
    @Size(max = 30)
    @ApiModelProperty(value = "이메일")
    private String email;

    @Size(min = 3, max = 70)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ApiModelProperty(value = "회원 비밀번호")
    private String pass;
}

