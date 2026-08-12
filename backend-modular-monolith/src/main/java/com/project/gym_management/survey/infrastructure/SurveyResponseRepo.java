package com.project.gym_management.survey.infrastructure;

import com.project.gym_management.survey.domain.SurveyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyResponseRepo extends JpaRepository<SurveyResponse,Long> {
}
