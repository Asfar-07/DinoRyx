package com.gym.auth_service.controller;

import com.gym.auth_service.model.UserDataModel;
import com.gym.auth_service.service.UserService;
import com.gym.auth_service.utils.JWTManage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;

@RestController
@RequestMapping("/auth")
public class ApiController {
    @Autowired
    JWTManage jwtManage;
    UserService service;

    @GetMapping(value = "/")
    public  String Home(){

        return "Hello";
    }

    @PostMapping(value = "/login")
    public  void Login(){

    }
    @PostMapping(value = "/signup")
    public ResponseEntity<String> SignUp(@RequestBody UserDataModel userData, HttpServletResponse response){
        String Token= jwtManage.generateToken(userData.getEmail());
        System.out.println(userData.getEmail());
        ResponseCookie cookie= ResponseCookie.from("JWT",Token).httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(15 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());
//        service.signupService(userData);
        return ResponseEntity.ok("202");
    }
    @PostMapping(value = "/logout")
    public ResponseEntity<String> Logout(HttpServletResponse response){
        ResponseCookie cookie= ResponseCookie.from("JWT",null).httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(0)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());
        return ResponseEntity.ok("202");
    }
}
