package com.gym.auth_service.component;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class GoogleVerifyCaptcha {
    @Value("${secret.key.google.captcha.server}")
    private String server_key;

    private static String url = "https://www.google.com/recaptcha/api/siteverify";

   public  boolean VerifyCaptcha(String token){

       RestTemplate restTemplate = new RestTemplate();

       MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
       params.add("secret", server_key );
       params.add("response", token);

       ResponseEntity<Map> response =
               restTemplate.postForEntity(url, params, Map.class);
       return (Boolean) response.getBody().get("success");
   }
}
