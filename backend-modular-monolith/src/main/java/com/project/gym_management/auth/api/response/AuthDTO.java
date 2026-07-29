package com.project.gym_management.auth.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDTO {
    private String name;
    private String email;
    private String picture;
    private boolean trainer;
}
