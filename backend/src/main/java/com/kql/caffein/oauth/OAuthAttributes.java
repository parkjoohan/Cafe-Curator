package com.kql.caffein.oauth;

import com.kql.caffein.dto.Role;
import com.kql.caffein.entity.EmailAuth;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.repository.EmailAuthRepository;
import com.kql.caffein.repository.UserRepository;
import com.kql.caffein.service.Impl.UserServiceImpl;
import com.kql.caffein.service.UserService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String email;
    private EmailAuthRepository emailAuthRepository;
    private UserRepository userRepository;

//    @Autowired
//    private final UserService userService;

    @Builder OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey,
                             String email){
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.email = email;
    }

    //OAuth2User에서 반환하는 사용자 정보는 Map이기 때문에 값을 하나씩 변환
    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        switch (registrationId){
            case "google":
                return ofGoogle(userNameAttributeName, attributes);
            case "kakao":
                return ofKakao("email", attributes);
            case "naver":
                return ofNaver("id", attributes);
            default:
                throw new RuntimeException("소셜 로그인 중 에러 발생!!");
        }
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributes.builder()
                .email((String)attributes.get("email"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        return OAuthAttributes.builder()
                .email((String) kakaoProfile.get("email"))
                .attributes(kakaoAccount)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .email((String) response.get("email"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("id", nameAttributeKey);
        map.put("key", nameAttributeKey);
        map.put("email", email);

        return map;
    }

//    public User toEntity(){
//        EmailAuth emailAuth = EmailAuth.builder()
//                .email(email)
//                .state(true)
//                .build();
//        emailAuthRepository.save(emailAuth);
//
//        User user = User.builder()
//                .userNo()
//                        .emailAuth(email)
//                                .oauthType("naver")
//                                        .role(Role.USER)
//                                                .build();
//        userRepository.save(user);
//
//
//        return .builder()
//                .emailAuth(email)
//                .oauthType("naver")
//                .role(Role.USER)
//                .build();
//    }
}
