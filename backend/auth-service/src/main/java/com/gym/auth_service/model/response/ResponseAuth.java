package com.gym.auth_service.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseAuth {
    private String name;
    private String email;
    private String picture;
    private boolean trainer;
}
