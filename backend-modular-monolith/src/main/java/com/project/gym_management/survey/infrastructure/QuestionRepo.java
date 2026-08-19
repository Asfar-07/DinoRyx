package com.project.gym_management.survey.infrastructure;

import com.project.gym_management.survey.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Long> {
    @Override
    Optional<Question> findById(Long id);

    List<Question> findBySurveyVersion_Id(Long verId);
}
