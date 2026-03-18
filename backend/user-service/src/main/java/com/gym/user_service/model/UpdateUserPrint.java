package com.gym.user_service.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateUserPrint {


    private String name;
    private String email;
    private String picture;
    private long updateDate;
    private  String address;
    private String phone_on;
    private  boolean available;
    private  String gender;
    private boolean trainer;
}
