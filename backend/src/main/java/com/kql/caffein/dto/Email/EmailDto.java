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
@ApiModel(value = "EmailDto : 이메일 정보", description = "이메일과 관련된 정보")
public class EmailDto {
    @ApiModelProperty(value = "회원 이메일")
    @Email(message = "이메일 형식이 아닙니다.")
    private String address;

    @ApiModelProperty(value = "메일 제목")
    private String title;

    @ApiModelProperty(value = "메일 내용")
    private String message;
}
