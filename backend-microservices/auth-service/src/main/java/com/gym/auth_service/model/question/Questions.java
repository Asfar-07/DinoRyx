package com.gym.auth_service.model.question;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table( name = "questions")
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(length = 10, updatable = true, nullable = false)
    private int ver_id;//for version of QS (which update)
    private int order;
    @Column( nullable = false)
    private String question_key;//text id eg:feature_rating,cancel_reason
    @Column( nullable = false)
    private String question_text; //real text
    @Enumerated(EnumType.STRING)
    @Column( nullable = false)
    private Type type; //what type question eg:single,multi,rating
    @Column( nullable = false)
    private boolean required; //optional
    @Column( nullable = false)
    private boolean active;
    @Column( nullable = false)
    private String slug; //which sessions need eg:source_of_awareness

    public enum Type {
        single_choice, multi_choice, text, rating
    }
}

