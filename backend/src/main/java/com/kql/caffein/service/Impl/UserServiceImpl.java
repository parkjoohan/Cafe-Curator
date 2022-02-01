package com.kql.caffein.service.Impl;

import com.kql.caffein.dto.Role;
import com.kql.caffein.dto.Token;
import com.kql.caffein.dto.User.UserDetailDto;
import com.kql.caffein.dto.User.UserDto;
import com.kql.caffein.dto.User.UserLoginDto;
import com.kql.caffein.entity.EmailAuth;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.jwt.TokenProvider;
import com.kql.caffein.repository.EmailAuthRepository;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.repository.UserRepository;
import com.kql.caffein.service.S3Service;
import com.kql.caffein.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.modelmapper.ModelMapper;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final EmailAuthRepository emailAuthRepository;
    private final S3Service s3Service;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisTemplate redisTemplate;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String getUserNo() throws Exception {
        //유저를 뜻하는 'U'를 맨 앞에 넣고 12자리 랜덤 문자열을 붙임)
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 12;
        Random random = new Random();
        String userLetter = "U";

        String generatedString = random.ints(leftLimit,rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return userLetter + generatedString;
    }

    @Override
    public String uploadPicture(MultipartFile multipartFile) throws Exception {
        String originFileName = multipartFile.getOriginalFilename();
        String extension = originFileName.substring(originFileName.length()-3);
        if(!(extension.equals("jpg") || extension.equals("png"))){
            throw new FileUploadException("파일 확장자가 jpg나 png가 아닙니다.");
        }
        String imgURL = s3Service.upload(multipartFile);

        return imgURL;
    }

    @Override
    @Transactional
    public void register(UserDto userDto, UserDetailDto userDetailDto) throws Exception {
        Optional<User> users = findByEmail(userDto.getEmail());

        //이메일 중복검사
        if(users.isPresent()){
            throw new IllegalArgumentException("이미 가입한 이메일입니다.");
        }

        try{
            //userNo 생성
            String randomUserNo = getUserNo();

            Optional<EmailAuth> emailAuth = emailAuthRepository.findByEmail(userDto.getEmail());

            User user = User.builder()
                    .userNo(randomUserNo)
                    .emailAuth(emailAuth.get())
                    .joinDate(new Date())
                    .oauthType("kql")
                    .role(Role.USER)
                    .build();
            userRepository.save(user);

            //관심사 나중에 해야함
            UserDetail userDetail = UserDetail.builder()
                    .userNo(randomUserNo)
                    .userId(userDetailDto.getUserId())
                    .pass(passwordEncoder.encode(userDetailDto.getPass()))
                    .build();
            userDetailRepository.save(userDetail);
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("가입 진행중 문제 발생");
        }
    }

    @Override
    @Transactional
    public void register(UserDto userDto, UserDetailDto userDetailDto, MultipartFile multipartFile) throws Exception {
        Optional<User> users = findByEmail(userDto.getEmail());
        if(users.isPresent()){
            throw new IllegalArgumentException("이미 가입한 이메일입니다.");
        }

        try{
            //userNo 생성
            String randomUserNo = getUserNo();

            Optional<EmailAuth> emailAuth = emailAuthRepository.findByEmail(userDto.getEmail());
            String imgRUL = uploadPicture(multipartFile);

            User user = User.builder()
                    .userNo(randomUserNo)
                    .emailAuth(emailAuth.get())
                    .joinDate(new Date())
                    .oauthType("kql")
                    .role(Role.USER)
                    .build();
            userRepository.save(user);

            //관심사 나중에 해야함
            UserDetail userDetail = UserDetail.builder()
                    .userNo(randomUserNo)
                    .userId(userDetailDto.getUserId())
                    .pass(passwordEncoder.encode(userDetailDto.getPass()))
                    .picture(imgRUL)
                    .build();
            userDetailRepository.save(userDetail);
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("가입 진행중 문제 발생");
        }
    }

    @Override
    @Transactional
    public void updateUser(UserDetailDto userDetailDto) throws Exception {
        UserDetail userDetail = userDetailRepository.findByUserNo(userDetailDto.getUserNo());

        userDetail.setUserId(userDetailDto.getUserId());
        userDetail.setIntroduction(userDetailDto.getIntroduction());
        userDetail.setCategoryList(userDetailDto.getCategoryList());

        userDetailRepository.save(userDetail);
    }

    @Override
    public void updateUser(UserDetailDto userDetailDto, MultipartFile multipartFile) throws Exception {
        UserDetail userDetail = userDetailRepository.findByUserNo(userDetailDto.getUserNo());

        String imgRUL = uploadPicture(multipartFile);

        userDetail.setUserId(userDetailDto.getUserId());
        userDetail.setIntroduction(userDetailDto.getIntroduction());
        userDetail.setCategoryList(userDetailDto.getCategoryList());
        userDetail.setPicture(imgRUL);

        userDetailRepository.save(userDetail);
    }

    @Override
    @Transactional
    public void deleteByUserNo(String userNo) {
        User user = userRepository.findByUserNo(userNo);
        String email = user.getEmailAuth().getEmail();
        emailAuthRepository.deleteByEmail(email);
        userRepository.deleteByUserNo(userNo);
    }

    @Override
    public UserDetailDto getUser(String userNo) throws Exception {
        UserDetail userDetail = userDetailRepository.findByUserNo(userNo);
        ModelMapper mapper = new ModelMapper();
        UserDetailDto userDetailDto = mapper.map(userDetail, UserDetailDto.class);

        return userDetailDto;
    }



    @Override
    public List<UserDetailDto> getUsers() {
        List<UserDetail> userDetailList = findAll();

        ModelMapper mapper = new ModelMapper();
        List<UserDetailDto> userDetailDtoList = userDetailList.stream().map(userDetail -> mapper.map(userDetail, UserDetailDto.class)).collect(Collectors.toList());

        return userDetailDtoList;
    }

    @Override
    public Token login(UserLoginDto userLoginDto) throws Exception {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPass());

        //유저 정보를 조회하여 인증 정보를 생성
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        //해당 인증 정보를 현재 실행중인 스레드(Security Context)에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //해당 인증 정보를 기반으로 jwt 토큰을 생성
        Token jwt = tokenProvider.createToken(authentication);

        redisTemplate.opsForValue().set(authentication.getName(), jwt.getRefreshToken(), jwt.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);
        return jwt;
    }

    @Override
    @Transactional
    public Token reissue(Token token) throws Exception {
        // Refresh Token 검증
        if(!tokenProvider.validateToken(token.getRefreshToken())){
            throw new RuntimeException("Refresh Token이 유효하지 않습니다.");
        }

        //Access Token에서 Email 가져오기
        Authentication authentication = tokenProvider.getAuthentication(token.getAccessToken());

        //저장소에서 Email을 키 값으로 가지는 Refresh Token 값 가져옴
        String refreshToken = (String)redisTemplate.opsForValue().get(authentication.getName());
        if(!refreshToken.equals(token.getRefreshToken())){
            throw new RuntimeException("Refresh Token 정보가 일치하지 않습니다.");
        }

        //새로운 토큰 생성
        Token newToken = tokenProvider.createToken(authentication);

        //Redis에 새 값으로 업데이트
        redisTemplate.opsForValue().set(authentication.getName(), newToken.getRefreshToken(), newToken.getRefreshTokenExpirationTime(), TimeUnit.MILLISECONDS);

        return newToken;
    }

    @Override
    public UserDetail findByUserNo(String userNo) {
        return userDetailRepository.findByUserNo(userNo);
    }

    @Override
    public Optional<UserDetail> findByUserId(String userId) {
        Optional<UserDetail> userDetail = userDetailRepository.findByUserId(userId);
        return userDetail;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UserDetail> findAll() {
        return userDetailRepository.findAll();
    }

}
