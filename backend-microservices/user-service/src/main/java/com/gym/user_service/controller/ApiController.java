package com.gym.user_service.controller;

import com.gym.user_service.Service.UserService;
import com.gym.user_service.model.UpdateUserPrint;
import com.gym.user_service.model.response.AccountDTO;
import com.gym.user_service.model.response.ProfileDTO;
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

    @GetMapping(value = "/me")
    public ResponseEntity<?> MeUser(@RequestHeader("User-ID") String id){
        Object[] response=service.FetchMe(Long.parseLong(id));
        if(response[0].equals(true)){
            AccountDTO res=(AccountDTO)response[1];
            System.out.println(res.getEmail());
            return ResponseEntity.ok(response[1]);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    @GetMapping(value = "/account")
    public ResponseEntity<ProfileDTO> CheckUser(@RequestHeader("User-ID") String id){
        Object[] response=service.FetchUser(Long.parseLong(id));
        if(response[0].equals(true)){
            return ResponseEntity.ok((ProfileDTO) response[2]);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping(value="/update")
    public ResponseEntity<String> UserUpdate(@RequestHeader("User-ID") String id, @RequestBody UpdateUserPrint new_userdata){
        boolean response=service.UpdateUser(Long.parseLong(id),new_userdata);
        if(response) return ResponseEntity.ok("success");
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @DeleteMapping(value="/delete/account")
    public  ResponseEntity<String> DeleteAccount( @RequestHeader("User-ID") String id){
        boolean response=service.DeleteService(Long.parseLong(id));
        if(response) return ResponseEntity.ok("success");
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
