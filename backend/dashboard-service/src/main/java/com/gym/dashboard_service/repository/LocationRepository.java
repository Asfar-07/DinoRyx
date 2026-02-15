package com.gym.dashboard_service.repository;

import com.gym.dashboard_service.model.locationmodel.CompanyLocationModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LocationRepository extends MongoRepository<CompanyLocationModel, Long> {
    CompanyLocationModel findById(long _id);
}
