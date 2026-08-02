package com.project.gym_management.auth.api;

import com.project.gym_management.auth.application.AuthService;
import com.project.gym_management.auth.application.MailService;
import com.project.gym_management.common.security.GoogleVerifyCaptcha;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/auth")
public class PasswordResetApi {
    @Autowired
    private GoogleVerifyCaptcha captchaVerify;
    @Autowired
    MailService mailService;
    @Autowired
    AuthService authService;

    @PostMapping(value = "/forgot/password")
    public ResponseEntity<?> ForgotPassword(@RequestBody HashMap<String,String> bodyData){
        String emailId=bodyData.get("emailId");
        System.out.println(emailId);
        boolean captchaResponse=captchaVerify.VerifyCaptcha(bodyData.get("captchaToken"));
        if (captchaResponse){
            try {
                mailService.sendResetLink(emailId);
                return ResponseEntity.ok("OTP sent to " + emailId);
            }catch (Exception e){
                return ResponseEntity.badRequest().body("Invalid email or user not found");
            }
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Captcha failed");
        }

    }
    @PostMapping(value = "/reset/password")
    public ResponseEntity<?> ResetPassword(@RequestBody HashMap<?,?> body){

        String token= (String) body.get("token");
        String newPassword= (String) body.get("new_password");

        return authService.ResetPassword(newPassword,token) ?
                ResponseEntity.ok("success") : ResponseEntity.badRequest().build();
    }
}
