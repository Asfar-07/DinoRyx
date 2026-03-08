package com.gym.user_service.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseAccount {
    private String name;
    private String email;
    private String picture;
    private boolean trainer;
}
