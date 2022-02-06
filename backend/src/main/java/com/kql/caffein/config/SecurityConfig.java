package com.kql.caffein.config;

import com.kql.caffein.jwt.JwtAccessDeniedHandler;
import com.kql.caffein.jwt.JwtAuthenticationEntryPoint;
import com.kql.caffein.jwt.JwtSecurityConfig;
import com.kql.caffein.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http
                .cors()

                .and()
                .csrf().disable()

                // exception handling 할 때 우리가 만든 클래스를 추가
                .exceptionHandling() //예외처리 기능
                .authenticationEntryPoint(jwtAuthenticationEntryPoint) //인증 실패시 (Spring Security에서 인증되지 않은 사용자)
                .accessDeniedHandler(jwtAccessDeniedHandler) //인가 실패시 (Spring Security에서 인증되었으나 권한이 없는 사용자)

                // 시큐리티는 기본적으로 세션을 사용
                // 토큰 기반 인증 방식을 사용하기 때문에 세션 off
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)


                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/users/test").hasRole("USER")
                .anyRequest().permitAll()

                // JwtFilter를 addFilterBefore로 등록했던 JwtSecurityConfig 클래스를 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

    }
}