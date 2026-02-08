package com.gym.dashboard_service.repository;

import com.gym.dashboard_service.model.DashboardStructure;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface DashboardRepository extends MongoRepository<DashboardStructure,Long> {
    DashboardStructure findByUserID(Long UserID);
}
