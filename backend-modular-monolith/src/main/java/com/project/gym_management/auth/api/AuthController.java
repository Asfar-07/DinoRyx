package com.project.gym_management.auth.api;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.project.gym_management.auth.api.request.ReqAuth;
import com.project.gym_management.auth.api.response.AuthDTO;
import com.project.gym_management.auth.application.AuthService;
import com.project.gym_management.common.cookie.CookieManage;
import com.project.gym_management.common.security.GoogleTokenVerifier;
import com.project.gym_management.common.security.JwtTokenManage;
import com.project.gym_management.user.domain.UserTable;
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
public class AuthController {

    @Autowired
    AuthService service;

    @Autowired
    JwtTokenManage JwtTokenManage;

    @Autowired
    GoogleTokenVerifier googleTokenVerifier;

    AuthDTO resAuth = new AuthDTO();

    @GetMapping(value = "/home")
    public  String Home(){

        return "Hello";
    }
    @PostMapping(value = "/login")
    public ResponseEntity<AuthDTO> Login(@RequestBody ReqAuth data, HttpServletResponse response) {
        HashMap<String,Object> res= service.loginService(data);
        if (res.get("status").equals(true) && res.get("message").equals("Password Matching")){
            UserTable finalModel= (UserTable) res.get("data");

            String accessToken= JwtTokenManage.generateAccessToken(finalModel.getEmail(),finalModel.getId());
            String refreshToken= JwtTokenManage.generateRefreshToken(finalModel.getEmail(),finalModel.getId());
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

            String accessToken= JwtTokenManage.generateAccessToken(finalModel.getEmail(),finalModel.getId());
            String refreshToken= JwtTokenManage.generateRefreshToken(finalModel.getEmail(),finalModel.getId());
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

    @PostMapping(value="/facebook/provider")
    public ResponseEntity<String> facebookProvider(@RequestBody Map<String, String> body) throws Exception {
        String token = body.get("token");

        return ResponseEntity.ok("ok");
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
            String accessToken= JwtTokenManage.generateAccessToken(finalModel.getEmail(),finalModel.getId());
            String refreshToken= JwtTokenManage.generateRefreshToken(finalModel.getEmail(),finalModel.getId());
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

    @PostMapping(value = "/refresh")
    public ResponseEntity<?> refreshToken(@CookieValue("SecuredREFRESH") String refreshToken,
                                          HttpServletResponse response) {

        if (!JwtTokenManage.validate(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Claims claims = JwtTokenManage.extractUserId(refreshToken);
        String userId = claims.getSubject();
        String email = claims.get("email", String.class);
        String newAccessToken= JwtTokenManage.generateAccessToken(email, Long.parseLong(userId));
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
