package com.gym.user_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "userdata1")
public class UserDataModel {

    @Id
    private Long id;
    private String name;
    private String email;
    private String password;
    private String auth_provider;
    private String picture;
    private long first_date;
    private long update_date;
    private  String address;
    private String phone_on;
    private  boolean available;
    private  String gender;

    private boolean trainer;

}
