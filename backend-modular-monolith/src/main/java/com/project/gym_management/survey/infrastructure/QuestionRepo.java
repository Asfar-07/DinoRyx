package com.project.gym_management.survey.infrastructure;

import com.project.gym_management.survey.domain.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Long> {
    @Override
    Optional<Question> findById(Long id);

    List<Question> findBySurveyVersion_Id(Long verId);

    @Query("""
        SELECT DISTINCT q FROM Question q
        LEFT JOIN FETCH q.option
        WHERE q.surveyVersion.id = :verId
          AND q.active = true
        ORDER BY q.order
        """)
    List<Question> findActiveQuestionsWithOptions(@Param("verId") Long verId);
}
