package com.project.gym_management.survey.api.response;

public record QsOptionDTO(
        Long id,
        String optionKey,
        String optionText,
        int order,
        boolean active
) {}
