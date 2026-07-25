package com.gym.dashboard_service.repository;

import com.gym.dashboard_service.model.locationmodel.CompanyLocationModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LocationRepository extends MongoRepository<CompanyLocationModel, Long> {
    Optional<CompanyLocationModel> findById(long _id);
}
