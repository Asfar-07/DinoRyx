package com.gym.user_service.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateUserPrint {


    private String name;
    private String email;
    private String picture;
    private String about;
    private String dob;
    private String avatar;
    private long updateDate;
    private  String address;
    private String phone_no;
    private  boolean available;
    private  String gender;
    private boolean trainer;
}
