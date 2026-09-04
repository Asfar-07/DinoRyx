package com.project.gym_management.survey.application.imp;

import com.project.gym_management.survey.application.QuestionService;
import com.project.gym_management.survey.domain.Question;
import com.project.gym_management.survey.infrastructure.QuestionRepo;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class QuestionServiceImp implements  QuestionService {

    final QuestionRepo questionRepo;

    public QuestionServiceImp(QuestionRepo questionRepo) {
        this.questionRepo = questionRepo;
    }

    @Override
    public List<Question> activeQuestionAndOptions(Long verId) {
        return questionRepo.findActiveQuestionsWithOptions(verId);
    }
}
