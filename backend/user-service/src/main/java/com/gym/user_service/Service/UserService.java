package com.gym.user_service.Service;

import com.gym.user_service.model.UpdateUserPrint;
import com.gym.user_service.model.UserDataModel;
import com.gym.user_service.model.response.ResponseAccount;
import com.gym.user_service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Service
public class UserService {
    @Autowired
    UserRepository repository;
    public Object[] FetchMe(String email){
        UserDataModel userdata=repository.findByEmail(email).orElse(null);
        ResponseAccount responseAccount=new ResponseAccount();
        if(userdata != null){
            responseAccount.setName((userdata.getName()));
            responseAccount.setEmail(userdata.getEmail());
            responseAccount.setPicture(userdata.getPicture());
            responseAccount.setTrainer(userdata.isTrainer());
            return new Object[]{true,responseAccount};
        }
        return  new Object[]{false};

    }
    public Object[] FetchUser(String email){
        UserDataModel userdata=repository.findByEmail(email).orElse(null);
        if(userdata!= null){
            Map<String,Object> collectData=new HashMap<>();
            collectData.put("id", userdata.getId());
            collectData.put("email",userdata.getEmail());
            collectData.put("name",userdata.getName());
            collectData.put("pic",userdata.getPicture());
            collectData.put("address",userdata.getAddress());
            collectData.put("phone", userdata.getPhone_on());
            collectData.put("gender",userdata.getGender());
            collectData.put("trainer", userdata.isTrainer());
            collectData.put("joindate",userdata.getFirst_date());
            collectData.put("available", userdata.isAvailable());
            return new Object[]{true, "User Available",collectData};
        }else {
            return new Object[]{false, "Not Available"};
        }
    }

    public boolean UpdateUser(String email,UpdateUserPrint update_user){
        UserDataModel userdata_from_db=repository.findByEmail(email).orElse(null);
        if(userdata_from_db != null){

            Date date = new Date(System.currentTimeMillis());
            userdata_from_db.setUpdate_date(date.getTime());

            //filtering received data and set to userdata_from_db for remove vanishing data from DB
            if(update_user.getName() != null && !update_user.getName().equals(userdata_from_db.getName())) {userdata_from_db.setName(update_user.getName());}
            if(update_user.getEmail() != null && !update_user.getEmail().equals(userdata_from_db.getEmail())) {userdata_from_db.setEmail(update_user.getEmail());}
            if(update_user.getAddress() != null && !update_user.getAddress().equals(userdata_from_db.getAddress())) {userdata_from_db.setAddress(update_user.getAddress());}
            if(update_user.getGender() != null && !update_user.getGender().equals(userdata_from_db.getGender())) {userdata_from_db.setGender(update_user.getGender());}
            if(update_user.getPhone_on() != null && !update_user.getPhone_on().equals(userdata_from_db.getPhone_on())) {userdata_from_db.setPhone_on(update_user.getPhone_on());}
            if(update_user.isAvailable() != userdata_from_db.isAvailable()) {userdata_from_db.setAvailable(update_user.isAvailable());}
            repository.save(userdata_from_db);
            return  true;
        }else{
            return false;
        }
    }
    public boolean DeleteService(String email){
        UserDataModel userdata_from_db=repository.findByEmail(email).orElse(null);
        if(userdata_from_db != null) {
            repository.delete(userdata_from_db);
            return true;
        }
        return false;
    }
}
