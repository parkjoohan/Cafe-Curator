package com.kql.caffein.service.Impl;

import com.kql.caffein.dto.Email.EmailAuthDto;
import com.kql.caffein.entity.EmailAuth;
import com.kql.caffein.repository.EmailAuthRepository;
import com.kql.caffein.repository.UserRepository;
import com.kql.caffein.service.EmailAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailAuthServiceImpl implements EmailAuthService {
    private final EmailAuthRepository emailAuthRepository;
    private final UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void emailCheck(EmailAuthDto emailAuthDto) throws Exception {
        Optional<EmailAuth> emails = emailAuthRepository.findByEmail(emailAuthDto.getEmail());

        //이메일로 조회한 결과가 있으면
        if(emails.isPresent()){
            throw new IllegalArgumentException("이미 가입한 이메일입니다.");
        } else{ //이미 가입된 이메일이 없으면
            // 코드 생성
            String code = setCode();

            //이메일을 보낸다.
            sendMail(emailAuthDto.getEmail(), code);

            //EmailAuth Entity를 만들어서 DB에 넣는다.
            EmailAuth emailAuth = EmailAuth.builder()
                    .email(emailAuthDto.getEmail())
                    .code(code)
                    .state(false)
                    .build();

            emailAuthRepository.save(emailAuth);
        }
    }

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
    public void sendMail(String email, String code) throws Exception {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("카페인 회원 인증 번호를 보내드립니다.");
        message.setText("caffe-in(카페인) 회원 인증 번호입니다!" + code);

        mailSender.send(message);
    }

    @Override
    public boolean verifyCode(EmailAuthDto emailAuthDto) throws Exception {
        Optional<EmailAuth> emailAuth = emailAuthRepository.findByEmail(emailAuthDto.getEmail());

        //DB에 등록된 이메일이 있다면
        if(emailAuth.isPresent()){
            //DB의 code와 Dto에 담긴 code가 일치한다면
            if(emailAuthDto.getCode().equals(emailAuth.get().getCode())){
                emailAuth.get().setState(true);
                emailAuthRepository.save(emailAuth.get());
                return true;
            }
        }else{
            throw new IllegalStateException("등록된 이메일이 없습니다.");
        }
        return false;
    }
}
