package com.kql.caffein.dto.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Builder
@ToString
@ApiModel(value = "UserUpdateDto : 회원의 수정할 정보", description = "회원정보 중 수정될 수 있는 정보")
public class UserUpdateDto {

    @NotNull
    @Size(max = 10)
    @ApiModelProperty(value = "회원 아이디")
    private String userId;

    @Size(max = 100)
    @ApiModelProperty(value = "자기소개")
    private String introduction;

    @ApiModelProperty(value = "프로필 사진")
    private String picture;

    @ApiModelProperty(value = "카테고리")
    private List<String> categoryList;
}
