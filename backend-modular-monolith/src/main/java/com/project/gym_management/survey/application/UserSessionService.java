package com.project.gym_management.survey.application;

import com.project.gym_management.survey.domain.SurveyVersion;
import com.project.gym_management.survey.domain.UserSurveySession;

import java.util.List;

public interface UserSessionService {

    List<UserSurveySession> listUserSession();
    UserSurveySession addUserSession(long userId, SurveyVersion version);
    void updateSession(long sessionId);
}
