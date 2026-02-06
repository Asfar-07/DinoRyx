package com.gym.user_service.model;

import lombok.Getter;
import lombok.Setter;


public class UpdateUserPrint {

    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String picture;
    @Setter
    @Getter
    private long update_date;
    @Setter
    @Getter
    private  String address;
    @Setter
    @Getter
    private String phone_on;
    @Setter
    @Getter
    private  boolean available;
    @Setter
    @Getter
    private  String gender;
    @Setter
    @Getter
    private boolean trainer;
}
