package com.kql.caffein.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.kql.caffein.dto.Role;
import com.kql.caffein.entity.EmailAuth;
import com.kql.caffein.entity.User.User;
import com.kql.caffein.entity.User.UserDetail;
import com.kql.caffein.repository.EmailAuthRepository;
import com.kql.caffein.repository.UserDetailRepository;
import com.kql.caffein.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class NaverLoginService {
    @Autowired
    private UserService userService;

    @Autowired
    private EmailAuthRepository emailAuthRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${oauth.pass}")
    private String basePass;

    @Value("${api.naver.clientId}")
    private String clientId;

    @Value("${api.naver.redirectURI}")
    private String redirectURI;

    @Value("${api.naver.state}")
    private String state;

    @Value("${api.naver.clientSecret}")
    private String clientSecret;

    public String getAccessToken (String authorize_code) {
        String access_Token = "";
        String refresh_Token = "";
        String reqURL = "https://nid.naver.com/oauth2.0/token";

        try {
            URL url = new URL(reqURL);

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            //POST 요청을 위해 기본값이 false인 setDoOutput을 true로

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            //POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + clientId);
            sb.append("&client_secret=" + clientSecret);
            sb.append("&code=" + authorize_code);
            sb.append("&state=" + state);
            bw.write(sb.toString());
            bw.flush();

            //    결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return access_Token;
    }

    public String getUserInfo (String access_Token) {
        String reqURL = "https://openapi.naver.com/v1/nid/me";
        String email = "";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);

            //요청에 필요한 Header에 포함될 내용
            conn.setRequestProperty("Authorization", "Bearer " + access_Token);

            int responseCode = conn.getResponseCode();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            JsonObject response = element.getAsJsonObject().get("response").getAsJsonObject();
            email = response.get("email").getAsString();

            br.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return email;
    }

    @Transactional
    public Map<String, String> naverRegister(String email) throws Exception {
        try{
            //userNo 생성
            String randomUserNo = userService.getUserNo();
            String randomUserNo2 = userService.getUserId();
            Map<String, String> map = new HashMap<>();

            map.put("userNo", randomUserNo);
            map.put("userId", randomUserNo2);

            Optional<EmailAuth> emailAuth = emailAuthRepository.findByEmail(email);

            if(emailAuth.isPresent()){
                throw new IllegalArgumentException("이미 가입한 이메일입니다.");
            } else{
                EmailAuth emailAuth1 = EmailAuth.builder()
                        .email(email)
                        .state(true)
                        .build();
                emailAuthRepository.save(emailAuth1);

                User user = User.builder()
                        .userNo(randomUserNo)
                        .emailAuth(emailAuth1)
                        .joinDate(new Date())
                        .oauthType("naver")
                        .role(Role.USER)
                        .build();
                userRepository.save(user);

                UserDetail userDetail = UserDetail.builder()
                        .userNo(randomUserNo)
                        .userId(randomUserNo2)
                        .pass(passwordEncoder.encode(basePass))
                        .build();
                userDetailRepository.save(userDetail);

                return map;
            }
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("네이버 가입 진행중 문제 발생");
        }
    }
}
