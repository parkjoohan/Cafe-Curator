package com.kql.caffein.dto.Email;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.Email;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "EmailAuthDto : 이메일 인증과 관련된 정보", description = "이메일 인증과 관련된 정보")
public class EmailAuthDto {
    @ApiModelProperty(value = "유저 이메일")
    @Email(message = "이메일 형식이 아닙니다.")
    private String email;

    @ApiModelProperty(value = "코드")
    private String code;

    @ApiModelProperty(value = "승인 상태")
    private boolean state;
}
