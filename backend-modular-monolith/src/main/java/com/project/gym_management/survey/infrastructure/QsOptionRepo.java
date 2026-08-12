package com.project.gym_management.survey.infrastructure;


import com.project.gym_management.survey.domain.QsOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QsOptionRepo extends JpaRepository<QsOption,Long>{

}
