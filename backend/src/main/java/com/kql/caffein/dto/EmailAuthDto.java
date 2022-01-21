package com.kql.caffein.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "EmailAuthDto : 이메일 인증과 관련된 정보", description = "이메일 인증과 관련된 정보")
public class EmailAuthDto {
    @ApiModelProperty(value = "유저 고유번호")
    private String userNo;

    @ApiModelProperty(value = "코드")
    private String code;
}
