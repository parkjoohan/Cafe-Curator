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
                .csrf().disable()

                .exceptionHandling() //예외처리 기능
                .authenticationEntryPoint(jwtAuthenticationEntryPoint) //인증 실패시 (Spring Security에서 인증되지 않은 사용자)
                .accessDeniedHandler(jwtAccessDeniedHandler) //인가 실패시 (Spring Security에서 인증되었으나 권한이 없는 사용자)

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션 off


                .and()
                .authorizeRequests()
                .anyRequest().permitAll()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider));

    }
}