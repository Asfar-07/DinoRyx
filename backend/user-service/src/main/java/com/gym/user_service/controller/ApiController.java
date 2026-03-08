package com.gym.user_service.controller;

import com.gym.user_service.Service.UserService;
import com.gym.user_service.model.UpdateUserPrint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/user/data")
public class ApiController {

    @Autowired
    UserService service;

    @GetMapping(value="/")
    public  String Home(){
        return "user Home";
    }
    @GetMapping(value = "/checkme")
    public ResponseEntity<HashMap> CheckUser(@RequestHeader("Email-ID") String email){
        System.out.println(email);
        Object[] response=service.FetchUser(email);
        if(response[0].equals(true)){
            return ResponseEntity.ok((HashMap) response[2]);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @PutMapping(value="/update")
    public ResponseEntity<String> UserUpdate(@RequestHeader("Email-ID") String email, @RequestBody UpdateUserPrint new_userdata){
        boolean response=service.UpdateUser(email,new_userdata);
        if(response) return ResponseEntity.ok("success");
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @DeleteMapping(value="/delete/account")
    public  ResponseEntity<String> DeleteAccount( @RequestHeader("Email-ID") String email){
        boolean response=service.DeleteService(email);
        if(response) return ResponseEntity.ok("success");
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
