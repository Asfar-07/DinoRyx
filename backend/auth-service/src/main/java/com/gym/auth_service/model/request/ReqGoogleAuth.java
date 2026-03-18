package com.gym.auth_service.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReqGoogleAuth {

    private String name;
    private String email;
    private String picture;
}
