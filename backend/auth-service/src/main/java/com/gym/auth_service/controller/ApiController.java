package com.gym.auth_service.controller;

import com.gym.auth_service.model.UserDataModel;
import com.gym.auth_service.service.UserService;
import com.gym.auth_service.utils.CookieManage;
import com.gym.auth_service.utils.JWTManage;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class ApiController {
    @Autowired
    JWTManage jwtManage;
    @Autowired
    UserService service;

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
    public void googleProvider(@RequestBody Map<String, String> body){
        String token = body.get("token");
        System.out.println(token);
    }
    @PostMapping(value="/facebook/provider")
    public void facebookProvider(@RequestBody Map<String, String> body){
        String token = body.get("token");
        System.out.println(token);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<String> Logout(HttpServletResponse response){
        CookieManage cookie=new CookieManage(response);
        cookie.removeCookie();
        return ResponseEntity.ok("200");
    }
}
