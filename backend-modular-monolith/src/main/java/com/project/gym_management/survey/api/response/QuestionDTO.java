package com.project.gym_management.survey.api.response;

import com.project.gym_management.survey.domain.Question;

import java.util.Set;

public record QuestionDTO(
        long id,
        int order,
        String questionKey,
        String questionText,
        Question.Type type,
        boolean required,
        boolean active,
        Set<QsOptionDTO> options
) {}
