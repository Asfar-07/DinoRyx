package com.project.gym_management.survey.api;


import com.project.gym_management.survey.api.request.SurveySubmitRequest;
import com.project.gym_management.survey.api.response.QsOptionDTO;
import com.project.gym_management.survey.api.response.QuestionDTO;
import com.project.gym_management.survey.application.QuestionService;
import com.project.gym_management.survey.application.ResponseService;
import com.project.gym_management.survey.application.UserSessionService;
import com.project.gym_management.survey.domain.Question;
import com.project.gym_management.survey.domain.SurveyVersion;
import com.project.gym_management.survey.domain.UserSurveySession;
import com.project.gym_management.survey.infrastructure.SurveyVersionRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/survey/onboarding")
public class OnboardingApi {

    final SurveyVersionRepo surveyVersionRepo;

    @Autowired
    UserSessionService userSessionService;

    @Autowired
    QuestionService questionService;

    @Autowired
    ResponseService responseService;

    public OnboardingApi(SurveyVersionRepo surveyVersionRepo) {
        this.surveyVersionRepo = surveyVersionRepo;
    }

    @GetMapping("/get/questions")
    public ResponseEntity<Map<String,Object>> getOnboarding(HttpServletRequest request){

        String userId = (String) request.getAttribute("userId");
        SurveyVersion version = surveyVersionRepo.findById(1L).orElseThrow(() -> new RuntimeException("Version not found"));

        UserSurveySession userSession = userSessionService.addUserSession(Long.parseLong(userId),version);
        if(userSession == null  ){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        List<QuestionDTO> questionDTO = questionService.activeQuestionAndOptions(version.getId()).stream()
                .map(this::toDto)
                .toList();
        HashMap<String, Long> ids = new HashMap<>();
        ids.put("sessionId", userSession.getId());
        ids.put("surveyVersionId", version.getId());

        Map<String, Object> response = new HashMap<>();

        response.put("ids", ids);
        response.put("questions", questionDTO);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/user/response")
    public ResponseEntity<String> SurveyResponse(@RequestBody SurveySubmitRequest request){

        responseService.saveUserResponse(request);
        return ResponseEntity.ok("ok");
    }


    private QuestionDTO toDto(Question q) {
        Set<QsOptionDTO> opts = q.getOption().stream()
                .map(o -> new QsOptionDTO(o.getId(), o.getOption_key(), o.getOption_text(), o.getOrder(), o.isActive()))
                .collect(Collectors.toSet());

        return new QuestionDTO(q.getId(), q.getOrder(), q.getQuestion_key(),
                q.getQuestion_text(), q.getType(), q.isRequired(), q.isActive(), opts);
    }

}
