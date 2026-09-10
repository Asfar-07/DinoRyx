package com.project.gym_management.user.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDTO {
    private String name;
    private String email;
    private String picture;
    private boolean trainer;
}
