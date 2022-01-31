package com.kql.caffein.service;

import com.kql.caffein.dto.Email.EmailAuthDto;
import com.kql.caffein.entity.EmailAuth;

public interface EmailAuthService {
    public void emailCheck(EmailAuthDto emailAuthDto) throws Exception;
    public String setCode() throws Exception;
    public void sendMail(String email, String code) throws Exception;
    public boolean verifyCode(EmailAuthDto emailAuthDto) throws Exception;
}
