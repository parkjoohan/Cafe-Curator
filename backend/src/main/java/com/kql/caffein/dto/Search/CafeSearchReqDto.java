package com.kql.caffein.dto.Search;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
public class CafeSearchReqDto {
    @ApiModelProperty(example = "회원 번호", required = true)
    private String userNo;
    @ApiModelProperty(example = "카페 위/경도", required = true)
    private Double[][] cafeLngAndLat;
    @ApiModelProperty(example = "화면에 보여진 마지막 피드 번호", required = false)
    private Integer feedNo;
    @ApiModelProperty(example = "화면에 보여질 사이즈", required = true)
    private int size;
}
