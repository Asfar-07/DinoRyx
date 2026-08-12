package com.project.gym_management.survey.application.imp;

import com.project.gym_management.survey.application.UserSessionService;
import com.project.gym_management.survey.domain.SurveyVersion;
import com.project.gym_management.survey.domain.UserSurveySession;
import com.project.gym_management.survey.infrastructure.SessionRepo;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class UserSessionIMP implements UserSessionService {
    final SessionRepo sessionRepo;

    public UserSessionIMP(SessionRepo sessionRepo) {
        this.sessionRepo = sessionRepo;
    }

    @Override
    public List<UserSurveySession> listUserSession() {
        return sessionRepo.findAll();
    }

    @Override
    public UserSurveySession addUserSession(long userId, SurveyVersion version) {

        UserSurveySession session = sessionRepo.findByUserIdAndSurveyVersionId(userId,version.getId()).orElse(null);

        if(session != null && session.getStatus().equals("Completed")){
            return  null;
        }
        if(session != null && session.getStatus().equals("progress")){
            session.setStartedAt(LocalDateTime.now());
            return  sessionRepo.save(session);
        }
        UserSurveySession newSession = UserSurveySession.builder()
                .userId(userId)
                .status("progress")
                .startedAt(LocalDateTime.now())
                .surveyVersion(version)
                .build();

        return sessionRepo.save(newSession);
    }

    @Override
    public void updateSession(long sessionId) {

    }
}
