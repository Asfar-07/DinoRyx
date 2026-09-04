package com.project.gym_management.survey.application;

import com.project.gym_management.survey.domain.Question;

import java.util.List;

public interface QuestionService {
    List<Question> activeQuestionAndOptions(Long verId);
}
