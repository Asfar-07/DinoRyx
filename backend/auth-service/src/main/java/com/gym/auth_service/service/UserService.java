package com.gym.auth_service.service;

import com.gym.auth_service.model.UserDataModel;
import com.gym.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;
    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public Object[] signupService(UserDataModel userdata){
        Random random = new Random();
        if(repository.findByEmail(userdata.getEmail()).orElse(null) == null){
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
            userdata.setId(numberRID);

            Date date = new Date(System.currentTimeMillis());
            userdata.setFirst_date(date.getTime());

            userdata.setAuth_provider("local");

            String hashedPassword = passwordEncoder.encode(userdata.getPassword());
            userdata.setPassword(hashedPassword);

            repository.save(userdata);
            return new Object[]{true,"New User Added"};
        }else {
            return new Object[]{false,"Email Existed"};
        }
    }
    public Object[] loginService(UserDataModel userdata) {
        if (repository.findByEmail(userdata.getEmail()).orElse(null) != null) {
            final String realPassword = repository.findByEmail(userdata.getEmail()).get().getPassword();
            if (passwordEncoder.matches(userdata.getPassword(), realPassword)){
                return new Object[]{true, "Password Matching"};
            }
            else {
                return new Object[]{false, "Password Not Match"};
            }

        } else {
            return new Object[]{false, "Not Found Email"};
        }
    }
    public Object[] googleService(Map<String,String> user){
        Random random = new Random();
        UserDataModel userData=new UserDataModel();
        if(user.get("email") == null){
            return new Object[]{false};
        }else {
            userData.setEmail(user.get("email"));
            userData.setName(user.get("name"));
            userData.setPicture(user.get("picture"));
        }
        if (repository.findByEmail(userData.getEmail()).orElse(null) == null){
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
            userData.setId(numberRID);

            Date date = new Date(System.currentTimeMillis());
            userData.setFirst_date(date.getTime());

            userData.setAuth_provider("google");
            repository.save(userData);
            return new Object[] {true};
        }else {
            return new Object[] {true};
        }
    }
}
