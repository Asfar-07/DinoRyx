package com.project.gym_management.survey.api;


import com.project.gym_management.survey.api.response.QsOptionDTO;
import com.project.gym_management.survey.api.response.QuestionDTO;
import com.project.gym_management.survey.application.UserSessionService;
import com.project.gym_management.survey.domain.Question;
import com.project.gym_management.survey.domain.SurveyVersion;
import com.project.gym_management.survey.domain.UserSurveySession;
import com.project.gym_management.survey.infrastructure.QsOptionRepo;
import com.project.gym_management.survey.infrastructure.QuestionRepo;
import com.project.gym_management.survey.infrastructure.SurveyVersionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/survey/onboarding")
public class OnboardingApi {
    final SurveyVersionRepo surveyVersionRepo;
    final QuestionRepo qsOptionRepo;

    @Autowired
    UserSessionService userSessionService;

    public OnboardingApi(SurveyVersionRepo surveyVersionRepo, QuestionRepo qsOptionRepo) {
        this.surveyVersionRepo = surveyVersionRepo;
        this.qsOptionRepo = qsOptionRepo;
    }

    @GetMapping("/get/questions")
    public ResponseEntity<List<QuestionDTO>> getOnboarding(){

        SurveyVersion version = surveyVersionRepo.findById(1L).orElseThrow(() -> new RuntimeException("Version not found"));
//        UserSurveySession userSession = userSessionService.addUserSession(802798375299L,version);
        List<QuestionDTO> questionDTO = version.getQuestions().stream()
                .map(this::toDto)
                .toList();
        return ResponseEntity.ok(questionDTO);
    }

    private QuestionDTO toDto(Question q) {
        Set<QsOptionDTO> opts = q.getOption().stream()
                .map(o -> new QsOptionDTO(o.getId(), o.getOption_key(), o.getOption_text(), o.getOrder(), o.isActive()))
                .collect(Collectors.toSet());

        return new QuestionDTO(q.getId(), q.getOrder(), q.getQuestion_key(),
                q.getQuestion_text(), q.getType(), q.isRequired(), q.isActive(), opts);
    }

}
