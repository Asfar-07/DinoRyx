package com.project.gym_management.survey.infrastructure;

import com.project.gym_management.survey.domain.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SurveyRepo extends JpaRepository<Survey,Long> {
    @Override
    Optional<Survey> findById(Long id);
    Optional<Survey> findByKey(String key);
}
