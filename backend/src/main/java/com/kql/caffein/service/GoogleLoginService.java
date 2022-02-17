package com.kql.caffein.service;

import com.google.gson.JsonElement;
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
import java.net.URL;
import java.util.*;

@Service
public class GoogleLoginService {

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

    @Value("${api.google.clientId}")
    private String clientId;

    @Value("${api.google.redirectURI}")
    private String redirectURI;

    @Value("${api.google.clientSecret}")
    private String clientSecret;

    public String getAccessToken(String authorize_code) {
        String access_Token = "";
        String id_Token = "";
        String reqURL = "https://oauth2.googleapis.com/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + clientId);
            sb.append("&redirect_uri=" + redirectURI);
            sb.append("&client_secret=" + clientSecret);
            sb.append("&code=" + authorize_code);
            bw.write(sb.toString());
//            System.out.println(sb);
            bw.flush();
            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
//            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            id_Token = element.getAsJsonObject().get("id_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return id_Token;
    }

    public String getUserInfo (String id_token) {
        String reqURL = "https://oauth2.googleapis.com/tokeninfo?id_token=" + id_token;
        String email = "";
        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setDoOutput(true);

            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
//            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);
            email = element.getAsJsonObject().get("email").getAsString();

            br.close();

        } catch (IOException e) {
            e.printStackTrace();
        }
        return email;
    }

    @Transactional
    public Map<String, String> googleRegister(String email) throws Exception {
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
                        .oauthType("google")
                        .role(Role.USER)
                        .build();
                userRepository.save(user);

                UserDetail userDetail = UserDetail.builder()
                        .userNo(randomUserNo)
                        .userId(randomUserNo2)
                        .pass(passwordEncoder.encode(basePass))
                        .categoryList(new ArrayList<>())
                        .build();
                userDetailRepository.save(userDetail);

                return map;
            }
        } catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("구글 가입 진행중 문제 발생");
        }
    }
}
