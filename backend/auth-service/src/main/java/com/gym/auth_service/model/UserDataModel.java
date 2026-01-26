package com.gym.auth_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "userdata1")
public class UserDataModel {

    @Id
    @Setter
    @Getter
    private Long id;
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String password;
    @Setter
    @Getter
    private String auth_provider;
    @Setter
    @Getter
    private String picture;
    @Setter
    @Getter
    private long first_date;
    @Setter
    @Getter
    private long update_date;

}
