package com.project.gym_management.survey.application;


import com.project.gym_management.survey.api.request.SurveySubmitRequest;
import com.project.gym_management.survey.domain.SurveyResponse;

import java.util.List;

public interface ResponseService {

    List<SurveyResponse> listResponse();
    SurveySubmitRequest saveUserResponse(SurveySubmitRequest request);
}
