package com.kql.caffein.service;

import com.kql.caffein.dto.EmailAuthDto;
import com.kql.caffein.dto.Role;
import com.kql.caffein.entity.EmailAuth;
import com.kql.caffein.entity.User;
import com.kql.caffein.repository.EmailAuthRepository;
import com.kql.caffein.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailAuthServiceImpl implements EmailAuthService{
    private final EmailAuthRepository emailAuthRepository;
    private final UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public String setCode() throws Exception{
        Random random = new Random();
        StringBuffer buffer = new StringBuffer();
        int num = 0;

        while(buffer.length() < 6) {
            num = random.nextInt(10);
            buffer.append(num);
        }

        return buffer.toString();
    }

    @Override
    public boolean verifyCode(EmailAuthDto emailAuthDto) throws Exception {
        EmailAuth emailAuth = emailAuthRepository.findByUserNo(emailAuthDto.getUserNo());
        User user = userRepository.findByUserNo(emailAuthDto.getUserNo());

        if(emailAuthDto.getCode().equals(emailAuth.getCode())){

            emailAuth.setState(true);
            emailAuthRepository.save(emailAuth);

            user.setRole(Role.USER);
            userRepository.save(user);

            return true;
        } else{
            return false;
        }
    }

    @Override
    public void sendMail(String email, String code) throws Exception {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("카페인 회원 인증 번호를 보내드립니다.");
        message.setText("caffe-in(카페인) 회원 인증 번호입니다!" + code);

        mailSender.send(message);
    }

    @Override
    public EmailAuth findByUserNo(String userNo) {
        return emailAuthRepository.findByUserNo(userNo);
    }
}
