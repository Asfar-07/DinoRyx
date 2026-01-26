package com.gym.auth_service.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.gym.auth_service.model.UserDataModel;
import com.gym.auth_service.service.UserService;
import com.gym.auth_service.utils.CookieManage;
import com.gym.auth_service.utils.GoogleTokenVerifier;
import com.gym.auth_service.utils.JWTManage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class ApiController {
    @Autowired
    JWTManage jwtManage;
    @Autowired
    UserService service;
    @Autowired
    GoogleTokenVerifier googleTokenVerifier;

    @GetMapping(value = "/")
    public  String Home(){

        return "Hello";
    }

    @PostMapping(value = "/login")
    public  ResponseEntity<String> Login(@RequestBody UserDataModel data, HttpServletResponse response){
        Object[] status= service.loginService(data);
        if (status[0].equals(true) && status[1].equals("Password Matching")){
            String Token= jwtManage.generateToken(data.getEmail());
            System.out.println(data.getEmail());

            CookieManage cookie=new CookieManage(response);
            cookie.createCookie(Token);

            return ResponseEntity.ok(data.getEmail());
        } else if (status[0].equals(false) && status[1].equals("Password Not Match")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<String> SignUp(@RequestBody UserDataModel userData, HttpServletResponse response){
        System.out.println(userData.getEmail());
        Object[] status = service.signupService(userData);
        if (status[0].equals(true)){
            String Token= jwtManage.generateToken(userData.getEmail());
            System.out.println(userData.getEmail());

            CookieManage cookie=new CookieManage(response);
            cookie.createCookie(Token);

            return ResponseEntity.ok(userData.getEmail());
        }
        else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    @PostMapping(value="/google/provider")
    public ResponseEntity<Map> googleProvider(@RequestBody Map<String, String> body,HttpServletResponse response) throws Exception {
        String token = body.get("token");
        Map<String,String> userdate = new HashMap<>();
        GoogleIdToken idToken = googleTokenVerifier.verify(token);

        if (idToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String picture = (String) payload.get("picture");
        userdate.put("email",email);
        userdate.put("name",name);
        userdate.put("picture",picture);
        Object[] status= service.googleService(userdate);
        if(status[0].equals(true)){
            String Token= jwtManage.generateToken(email);

            CookieManage cookie=new CookieManage(response);
            cookie.createCookie(Token);
            return ResponseEntity.ok(userdate);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }
    @PostMapping(value="/facebook/provider")
    public ResponseEntity<String> facebookProvider(@RequestBody Map<String, String> body) throws Exception {
        String token = body.get("token");

        return ResponseEntity.ok("ok");
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<String> Logout(HttpServletResponse response){
        CookieManage cookie=new CookieManage(response);
        cookie.removeCookie();
        return ResponseEntity.ok("200");
    }
}
