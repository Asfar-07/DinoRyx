package com.project.gym_management.survey.infrastructure;

import com.project.gym_management.survey.domain.UserSurveySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SessionRepo extends JpaRepository<UserSurveySession,Long> {

    Optional<UserSurveySession> findByUserIdAndSurveyVersionId(Long userId, Long surveyVersionId);
}
