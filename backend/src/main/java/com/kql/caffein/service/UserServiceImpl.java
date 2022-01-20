package com.kql.caffein.service;

import com.kql.caffein.dto.Role;
import com.kql.caffein.dto.UserDetailDto;
import com.kql.caffein.dto.UserDto;
import com.kql.caffein.entity.User;
import com.kql.caffein.entity.UserDetail;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final UserDetailRepository userDetailRepository;
    private final PasswordEncoder passwordEncoder;
    private final String separ = File.separator;

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
        //프로필 사진(multipartFile)이 비어있지 않다면 사진을 저장하고 DB에 저장할 경로명을 만듦
        File file = new File("");
        String rootPath = file.getAbsolutePath().split("backend")[0];
        String savePath = rootPath + "frontend" + separ + "public" + separ + "image" + separ + "profileImg";

        if(!new File(savePath).exists()){
            try{
                new File(savePath).mkdirs();
            } catch (Exception e){
                e.printStackTrace();
            }
        }

        String originFileName = multipartFile.getOriginalFilename();
        String extension = originFileName.substring(originFileName.length()-3);
        if(!(extension.equals("jpg") || extension.equals("png"))){
            throw new FileUploadException("파일 확장자가 jpg나 png가 아닙니다.");
        }
        String saveFileName = UUID.randomUUID().toString() + originFileName;
        String filePath = savePath + separ + saveFileName;

        multipartFile.transferTo(new File(filePath));

        return filePath;
    }

    @Override
    @Transactional
    public void register(UserDto userDto, UserDetailDto userDetailDto) throws Exception {
        Optional<User> users = findByEmail(userDto.getEmail());
        if(!users.isEmpty()){
            throw new IllegalArgumentException("이미 가입한 이메일입니다.");
        }

        String randomUserNo = getUserNo();
        User user = User.builder()
                .userNo(randomUserNo)
                .email(userDto.getEmail())
                .joinDate(new Date())
                .oauthType("kql")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        UserDetail userDetail = UserDetail.builder()
                .userNo(randomUserNo)
                .userId(userDetailDto.getUserId())
                .pass(passwordEncoder.encode(userDetailDto.getPass()))
                .introduction(userDetailDto.getIntroduction())
                .build();
        userDetailRepository.save(userDetail);
    }

    @Override
    @Transactional
    public void register(UserDto userDto, UserDetailDto userDetailDto, MultipartFile multipartFile) throws Exception {
        Optional<User> users = findByEmail(userDto.getEmail());
        if(!users.isEmpty()){
            throw new IllegalArgumentException("이미 가입한 이메일입니다.");
        }

        String filePath = uploadPicture(multipartFile);
        String randomUserNo = getUserNo();
        User user = User.builder()
                .userNo(randomUserNo)
                .email(userDto.getEmail())
                .joinDate(new Date())
                .oauthType("kql")
                .role(Role.USER)
                .build();
        userRepository.save(user);

        UserDetail userDetail = UserDetail.builder()
                .userNo(randomUserNo)
                .userId(userDetailDto.getUserId())
                .pass(passwordEncoder.encode(userDetailDto.getPass()))
                .introduction(userDetailDto.getIntroduction())
                .picture(filePath)
                .build();
        userDetailRepository.save(userDetail);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
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

        File originFile = new File(userDetail.getPicture());

        if(originFile.exists()){
            originFile.delete();
            log.info("이전 프로필 사진 삭제");
        }

        String filePath = uploadPicture(multipartFile);

        userDetail.setUserId(userDetailDto.getUserId());
        userDetail.setIntroduction(userDetailDto.getIntroduction());
        userDetail.setCategoryList(userDetailDto.getCategoryList());
        userDetail.setPicture(filePath);

        userDetailRepository.save(userDetail);
    }

    @Override
    public void deleteByUserNo(String userNo) {
        userRepository.deleteByUserNo(userNo);
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
    public List<UserDetail> findAll() {
        return userDetailRepository.findAll();
    }
}
