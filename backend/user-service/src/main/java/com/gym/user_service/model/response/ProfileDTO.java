package com.gym.user_service.model.response;

import com.gym.user_service.model.UserProfileTable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
public class ProfileDTO {

    private long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
    private String phone_no;
    private String about;
    private String address;
    private String dob;
    private String avatar;
    private String gender;
    private long updateDate;
    private  boolean available;
    private boolean trainer;
}
