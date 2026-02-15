package com.gym.dashboard_service.repository;

import com.gym.dashboard_service.model.dashboardmodel.DashboardStructure;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface DashboardRepository extends MongoRepository<DashboardStructure,Long> {

    Optional<DashboardStructure> findByOwnerID(Long ownerID);
    Optional<DashboardStructure> findBy_id(String _id);
}
