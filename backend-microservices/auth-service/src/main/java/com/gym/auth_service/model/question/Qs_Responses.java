package com.gym.auth_service.model.question;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table( name = "Qs_Responses")
public class Qs_Responses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    long session_id;
    long q_id;
}
