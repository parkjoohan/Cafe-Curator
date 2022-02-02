package com.kql.caffein.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Token {
    private String accessToken;
    private String refreshToken;
    private Long refreshTokenExpirationTime;
}
