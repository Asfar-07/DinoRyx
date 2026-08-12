package com.project.gym_management.survey.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table( name = "surveys")
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(name="survey_key",nullable = false, updatable = false, unique = true)
    private String key;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private boolean active=true;

    @OneToMany(mappedBy = "survey", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SurveyVersion> versions;


}
