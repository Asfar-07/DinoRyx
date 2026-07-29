package com.project.gym_management.auth.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReqGoogleAuth {

    private String name;
    private String email;
    private String picture;
}
