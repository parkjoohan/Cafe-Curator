package com.kql.caffein.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class GoogleLoginService {

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
            System.out.println("access_token : " + access_Token);
            System.out.println("id_token : " + id_Token);

            br.close();

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
}
