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
@ApiModel(value = "UserDto : 회원정보", description = "회원정보 중 수정되지 않는 정보")
public class UserUpdatePassDto {
    @NotNull
    @Size(max = 30)
    @ApiModelProperty(value = "이메일")
    private String email;

    @Size(min = 3, max = 70)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ApiModelProperty(value = "회원 비밀번호")
    private String pass;
}