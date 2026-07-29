package com.project.gym_management.auth.api;

import com.project.gym_management.auth.api.request.ReqAuth;
import com.project.gym_management.auth.api.response.AuthDTO;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping(value = "/home")
    public  String Home(){

        return "Hello";
    }
    @PostMapping(value = "/login")
    public ResponseEntity<AuthDTO> Login(@RequestBody ReqAuth data, HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
