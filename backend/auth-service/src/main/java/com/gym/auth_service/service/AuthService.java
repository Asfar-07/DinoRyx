package com.gym.auth_service.service;

import com.gym.auth_service.model.PasswordResetForm;
import com.gym.auth_service.model.UserDataModel;
import com.gym.auth_service.repository.PasswordResetRepo;
import com.gym.auth_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;
    @Autowired
    PasswordResetRepo resetRepo;
    private final PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    HashMap<String, Object> response=new HashMap<>();

    public HashMap<String,Object> signupService(UserDataModel userdata){
        Random random = new Random();
        if(repository.findByEmail(userdata.getEmail()).orElse(null) == null){
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
            userdata.setId(numberRID);

            Date date = new Date(System.currentTimeMillis());
            userdata.setFirst_date(date.getTime());

            userdata.setAuth_provider("local");
            userdata.setAvailable(false);
            userdata.setTrainer(false);

            String hashedPassword = passwordEncoder.encode(userdata.getPassword());
            userdata.setPassword(hashedPassword);

            repository.save(userdata);

            this.response.put("status",true);
            this.response.put("message","New User Added");
            this.response.put("data",userdata);
            return this.response;
        }else {
            response.put("status",false);
            response.put("message","Email Existed");
            response.put("data",null);
            return  this.response;
        }
    }
    public HashMap<String,Object> loginService(UserDataModel userdata) {
        final String enterPassword=userdata.getPassword();
        userdata=repository.findByEmail(userdata.getEmail()).orElse(null);
        if (userdata != null) {
            final String realPassword = userdata.getPassword();
            if (passwordEncoder.matches(enterPassword, realPassword)){
                this.response.put("status",true);
                this.response.put("message","Password Matching");
                this.response.put("data",userdata);
                return this.response;
            }
            else {
                this.response.put("status",false);
                this.response.put("message","Password Not Match");
                this.response.put("data",null);
                return this.response;
            }
        } else {
            this.response.put("status",false);
            this.response.put("message","Not Found Email");
            this.response.put("data",null);
            return this.response;
        }
    }
    public HashMap<String,Object>  googleService(Map<String,String> user){
        Random random = new Random();
        UserDataModel userData=repository.findByEmail(user.get("email")).orElse(null);
        if(user.get("email") == null){
            this.response.put("status",false);
            return this.response;
        }

        if (userData == null){
            userData.setEmail(user.get("email"));
            userData.setName(user.get("name"));
            userData.setPicture(user.get("picture"));
            long numberRID = (long) (100000 + random.nextInt(900000)) *(100000 + random.nextInt(900000));
            userData.setId(numberRID);

            Date date = new Date(System.currentTimeMillis());
            userData.setFirst_date(date.getTime());

            userData.setAuth_provider("google");
            repository.save(userData);
            this.response.put("status",true);
            this.response.put("data",userData);
            return this.response;
        }else {
            this.response.put("status",true);
            this.response.put("data",userData);
            return this.response;
        }
    }
    public boolean ResetPassword(String newPassword, String tokenId){
        List<PasswordResetForm> tokens = resetRepo.findAllValidation(LocalDateTime.now()); // collect data
        for (PasswordResetForm table : tokens) {                                           // make loop for find match token
            if (passwordEncoder.matches(tokenId, table.getToken())) {
                UserDataModel thisUserData=repository.findByEmail(table.getEmail()).orElse(null);
                if (thisUserData != null){
                    thisUserData.setPassword(passwordEncoder.encode(newPassword));
                    table.setUsed(true);                 // for avoid multiple change with using same token

                    repository.save(thisUserData);
                    resetRepo.save(table);

                    return true; //success all
                }
                return false; //user not exited
            }
            return false; // token not matching
        }
        return false; // expired or not exited
    }
}
