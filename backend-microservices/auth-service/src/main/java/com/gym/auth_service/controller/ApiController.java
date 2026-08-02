package com.gym.auth_service.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.gym.auth_service.model.UserTable;
import com.gym.auth_service.model.request.ReqAuth;
import com.gym.auth_service.model.response.AuthDTO;
import com.gym.auth_service.service.AuthService;
import com.gym.auth_service.component.CookieManage;
import com.gym.auth_service.component.GoogleTokenVerifier;
import com.gym.auth_service.component.JWTManage;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class ApiController {
    @Autowired
    JWTManage jwtManage;
    @Autowired
    AuthService service;
    @Autowired
    GoogleTokenVerifier googleTokenVerifier;

    AuthDTO resAuth=new AuthDTO();

    @GetMapping(value = "/home")
    public  String Home(){
        service.TestService();
        return "Hello";
    }
    @PostMapping(value = "/login")
    public  ResponseEntity<AuthDTO> Login(@RequestBody ReqAuth data, HttpServletResponse response){
        HashMap<String,Object> res= service.loginService(data);
        if (res.get("status").equals(true) && res.get("message").equals("Password Matching")){
            UserTable finalModel= (UserTable) res.get("data");

            String accessToken= jwtManage.generateAccessToken(finalModel.getEmail(),finalModel.getId());
            String refreshToken= jwtManage.generateRefreshToken(finalModel.getEmail(),finalModel.getId());
            CookieManage cookie=new CookieManage(response);
            cookie.createCookie(accessToken,refreshToken);
            //ResponseModel
            resAuth.setName(finalModel.getUsername());
            resAuth.setEmail(finalModel.getEmail());
//            resAuth.setPicture(finalModel.getPicture());
//            resAuth.setTrainer(finalModel.isTrainer());
            return ResponseEntity.ok(resAuth);
        } else if (res.get("status").equals(false) && res.get("message").equals("Password Not Match")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<AuthDTO> SignUp(@RequestBody ReqAuth userData, HttpServletResponse response){System.out.println(userData.getEmail());
        HashMap<String,Object> res = service.signupService(userData);
        if (res.get("status").equals(true)){
            UserTable finalModel= (UserTable) res.get("data");

            String accessToken= jwtManage.generateAccessToken(finalModel.getEmail(),finalModel.getId());
            String refreshToken= jwtManage.generateRefreshToken(finalModel.getEmail(),finalModel.getId());
            CookieManage cookie=new CookieManage(response);
            cookie.createCookie(accessToken,refreshToken);
            //ResponseModel
            resAuth.setName(finalModel.getUsername());
            resAuth.setEmail(finalModel.getEmail());
//            resAuth.setPicture(finalModel.getPicture());
//            resAuth.setTrainer(finalModel.isTrainer());
            return ResponseEntity.ok(resAuth);
        }
        else {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    @PostMapping(value="/google/provider")
    public ResponseEntity<AuthDTO> googleProvider(@RequestBody Map<String, String> body, HttpServletResponse response) throws Exception {
        String token = body.get("token");
        Map<String,String> userDate = new HashMap<>();
        GoogleIdToken idToken = googleTokenVerifier.verify(token);

        if (idToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        GoogleIdToken.Payload payload = idToken.getPayload();

        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String picture = (String) payload.get("picture");
        userDate.put("email",email);
        userDate.put("name",name);
        userDate.put("picture",picture);

        HashMap<String,Object> res= service.googleService(userDate);
        if(res.get("status").equals(true)){
            UserTable finalModel= (UserTable) res.get("data");
            String accessToken= jwtManage.generateAccessToken(finalModel.getEmail(),finalModel.getId());
            String refreshToken= jwtManage.generateRefreshToken(finalModel.getEmail(),finalModel.getId());
            CookieManage cookie=new CookieManage(response);
            cookie.createCookie(accessToken,refreshToken);
            //ResponseModel
            resAuth.setName(finalModel.getUsername());
            resAuth.setEmail(finalModel.getEmail());
//            resAuth.setPicture(finalModel.getPicture());
//            resAuth.setTrainer(finalModel.isTrainer());
            return ResponseEntity.ok(resAuth);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }

    @PostMapping(value="/facebook/provider")
    public ResponseEntity<String> facebookProvider(@RequestBody Map<String, String> body) throws Exception {
        String token = body.get("token");

        return ResponseEntity.ok("ok");
    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue("SecuredREFRESH") String refreshToken,
                                          HttpServletResponse response) {
        if (!jwtManage.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Claims claims = jwtManage.extractUserId(refreshToken);
        String userId = claims.getSubject();
        String email = claims.get("email", String.class);
        String newAccessToken= jwtManage.generateAccessToken(email, Long.parseLong(userId));
        ResponseCookie newAccessCookie= ResponseCookie.from("SecuredJWT",newAccessToken).httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(15 * 60)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, newAccessCookie.toString());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<String> Logout(HttpServletResponse response){
        CookieManage cookie=new CookieManage(response);
        cookie.removeCookie();
        return ResponseEntity.ok("success");
    }

}
