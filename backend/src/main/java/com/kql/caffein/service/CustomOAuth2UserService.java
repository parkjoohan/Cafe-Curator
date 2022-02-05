package com.kql.caffein.service;

import com.kql.caffein.dto.Role;
import com.kql.caffein.entity.EmailAuth;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.oauth.OAuthAttributes;
import com.kql.caffein.repository.EmailAuthRepository;
import com.kql.caffein.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private UserRepository userRepository;
    private final HttpSession httpSession;
    private UserService userService;
    private EmailAuthRepository emailAuthRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException{
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

        //현재 로그인 진행 중인 서비스를 구분한다(로그인을 카카오, 구글, 네이버 중 어떤걸로 하는지)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        //OAuth2 로그인 진행시 키가 되는 필드 값(PK개념. 네이버는 id, 구글은 sub)
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        //CustomOAuth2UserService를 통해 가져온 OAuth2User의 attribute를 담을 클래스
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

//        log.info("attributes: {}", attributes);
//        Optional<User> user = saveOrUpdate(attributes);
        Optional<User> user = userRepository.findByEmail(attributes.getEmail());

        //세션에 사용자 정보를 저장하기 위해 user를 직렬화 하는 sessionUser
//        httpSession.setAttribute("user", new SessionUser(user));
        if(user.isPresent()){
            httpSession.setAttribute("email", user.get().getEmailAuth());

            return new DefaultOAuth2User(
                    Collections.singleton(new SimpleGrantedAuthority(user.get().getRole().getKey()))
                    , attributes.getAttributes()
                    , attributes.getNameAttributeKey()
            );
        } else{
        try{
            EmailAuth emailAuth = EmailAuth.builder()
                    .email(attributes.getEmail())
                    .state(true)
                    .build();
            emailAuthRepository.save(emailAuth);

            String randomUserNo = userService.getUserNo();
            User user1 = User.builder()
                    .userNo(randomUserNo)
                    .emailAuth(emailAuth)
                    .oauthType(registrationId)
                    .role(Role.USER)
                    .build();
            userRepository.save(user1);

            return new DefaultOAuth2User(
                    Collections.singleton(new SimpleGrantedAuthority(user1.getRole().getKey()))
                    , attributes.getAttributes()
                    , attributes.getNameAttributeKey()
            );
        } catch (Exception e){
            throw new RuntimeException("에러 발생!!");
        }
        }
    }

//    Map<String, Object> convertToMap() {
//        Map<String, Object> map = new HashMap<>();
//        map.put("id", attributeKey);
//        map.put("key", attributeKey);
//        map.put("name", name);
//        map.put("email", email);
//        map.put("picture", picture);
//
//        return map;
//    }
    private Optional<User> saveOrUpdate(OAuthAttributes attributes){
        // 기존 유저라면 update, 신규 유저라면 User를 생성
        Optional<User> user = userRepository.findByEmail(attributes.getEmail());


        return user;
    }
}
