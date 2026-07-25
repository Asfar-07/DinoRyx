package com.gym.user_service.model.response;

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
