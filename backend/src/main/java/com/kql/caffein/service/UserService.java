package com.kql.caffein.service;

import com.kql.caffein.dto.Token;
import com.kql.caffein.dto.User.UserDetailDto;
import com.kql.caffein.dto.User.UserDto;
import com.kql.caffein.dto.User.UserLoginDto;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface UserService {
    //userNo 생성
    public String getUserNo() throws Exception;
    //프로필 사진 업로드
    public String uploadPicture(MultipartFile multipartFile) throws Exception;
    //회원가입(사진X)
    public void register(UserDto userDto, UserDetailDto userDetailDto) throws Exception;
    //회원가입(사진O)
    public void register(UserDto userDto, UserDetailDto userDetailDto, MultipartFile multipartFile) throws Exception;

    //유저 정보 수정(사진X)
    public void updateUser(UserDetailDto userDetailDto) throws Exception;
    //유저 정보 수정(사진O)
    public void updateUser(UserDetailDto userDetailDto, MultipartFile multipartFile) throws Exception;

    //유저 삭제
    public void deleteByUserNo(String userNo);

    //유저 상세조회
    public UserDetailDto getUser(String userNo) throws Exception;

    //모든 유저 조회
    public List<UserDetailDto> getUsers();

    //로그인
    public Token login(UserLoginDto userLoginDto) throws Exception;

    //토큰 재발급
    public Token reissue(Token token) throws Exception;

    public UserDetail findByUserNo(String userNo);
    public Optional<UserDetail> findByUserId(String userId);
    public Optional<User> findByEmail(String email) throws Exception;
    public List<UserDetail> findAll();
}
