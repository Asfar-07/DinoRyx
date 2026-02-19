package com.gym.dashboard_service.repository;

import com.gym.dashboard_service.model.studentmodel.StudentModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends MongoRepository<StudentModel,Long> {
    Optional<StudentModel> findById(long _id);
    List<StudentModel> findAllByDashboardId(String dashboardId);
}
