package com.gym.auth_service.model.question;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table( name = "qs_options")
public class Qs_Options {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column( nullable = false)
    long q_id;
    @Column( nullable = false)
    int order;
    @Column( updatable = false, nullable = false)
    String option_key;
    @Column( nullable = false)
    String option_text;
    @Column( nullable = false)
    boolean active;
}
