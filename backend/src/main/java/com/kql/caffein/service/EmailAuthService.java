package com.kql.caffein.service;

import com.kql.caffein.dto.Email.EmailAuthDto;
import com.kql.caffein.entity.EmailAuth;

public interface EmailAuthService {
    //이메일 중복검사
    public void emailCheck(EmailAuthDto emailAuthDto) throws Exception;
    
    //코드 생성
    public String setCode() throws Exception;
    //코드 검증
    public boolean verifyCode(EmailAuthDto emailAuthDto) throws Exception;

    //이메일 전송
    public void sendMail(String email, String code) throws Exception;
    
    //비밀번호 찾기 - 이메일 전송
    public void findPassSendEmail(String email) throws Exception;
}
