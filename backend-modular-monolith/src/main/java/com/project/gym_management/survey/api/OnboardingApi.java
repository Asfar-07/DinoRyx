package com.project.gym_management.survey.api;


import com.project.gym_management.survey.application.UserSessionService;
import com.project.gym_management.survey.domain.Question;
import com.project.gym_management.survey.domain.SurveyVersion;
import com.project.gym_management.survey.domain.UserSurveySession;
import com.project.gym_management.survey.infrastructure.SurveyVersionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/survey/onboarding")
public class OnboardingApi {
    final SurveyVersionRepo surveyVersionRepo;

    @Autowired
    UserSessionService userSessionService;

    public OnboardingApi(SurveyVersionRepo surveyVersionRepo) {
        this.surveyVersionRepo = surveyVersionRepo;
    }

    @GetMapping("/get/questions")
    public ResponseEntity<Set<Question>> getOnboarding(){

        SurveyVersion version = surveyVersionRepo.findById(1L).orElseThrow(() -> new RuntimeException("Version not found"));
        Set<Question> questions = version.getQuestions();
        UserSurveySession userSession = userSessionService.addUserSession(802798375299L,version);
        System.out.println(questions.stream().toList().getFirst().getOption());
        return ResponseEntity.ok(questions);
    }

}
