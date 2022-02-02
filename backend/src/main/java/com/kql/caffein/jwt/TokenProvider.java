package com.kql.caffein.jwt;

import com.kql.caffein.dto.Token;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider implements InitializingBean {
    private static final String AUTHORITIES_KEY = "auth";
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60;            // 1시간
    private static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 14;  // 2주

    @Value("${jwt.secret}")
    private String secret;

    private Key key;

    @Override
    public void afterPropertiesSet() throws Exception{
        //서명에 담을 데이터
        byte[] keyBytes = DatatypeConverter.parseBase64Binary(secret);
        this.key = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS512.getJcaName());
    }

    //Jwt 토큰 생성 메소드
    public Token createToken(Authentication authentication){
        //권한들 가져오기
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Long now = new Date().getTime();

        Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME);
        String accessToken = Jwts.builder()
                .setSubject(authentication.getName())       // 토큰 제목 (sub Claim). 예시 : payload "sub": "name"
                .claim(AUTHORITIES_KEY, authorities)        // 사용자 정의 Claim. 권한 설정 (auth Claim). 예시 : payload "auth": "ROLE_USER"
                .setExpiration(accessTokenExpiresIn)        // 만료기간 (exp Claim). 예시 : payload "exp": 1516239022
                .signWith(SignatureAlgorithm.HS512, key)    // 암호화 알고리즘, signature에 들어갈 secret값 세팅. header "alg": "HS512"
                .compact();

        // Refresh Token 생성
        String refreshToken = Jwts.builder()
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();

        return Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .refreshTokenExpirationTime(REFRESH_TOKEN_EXPIRE_TIME)
                .build();

    }

    //인증 성공시 SecurityContextHolder에 저장할 Authentication 객체 생성 (권한 정보를 파싱하여 Authentication 객체 리턴)
    public Authentication getAuthentication(String accessToken){
        //토큰에서 Payload(Claim) 추출
        Claims claims = Jwts
                .parser()
                .setSigningKey(key) //서명 키 생성
                .parseClaimsJws(accessToken) //토큰을 Jws로 파싱
                .getBody();

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        //Claim에서 권한 정보 가져오기
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        //User 객체를 만들어서 Authentication 리턴
        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, accessToken, authorities);
    }

    //토큰 검증
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (SignatureException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (MalformedJwtException e) {
            log.info("JWT 토큰이 올바르게 구성되지 않았습니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰의 인수가 잘못되었습니다.");
        }
        return false;
    }
}
