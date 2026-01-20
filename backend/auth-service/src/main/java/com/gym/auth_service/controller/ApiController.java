package com.gym.auth_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ApiController {
//    @Autowired

    @PostMapping(value = "/login")
    public  void Login(){

    }

}
