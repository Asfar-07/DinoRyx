package com.project.gym_management.auth.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReqAuth {
    private String username;
    private String email;
    private String password;
}
