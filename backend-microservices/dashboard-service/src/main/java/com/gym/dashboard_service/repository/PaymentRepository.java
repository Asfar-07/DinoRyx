package com.gym.dashboard_service.repository;

import com.gym.dashboard_service.model.amountmodel.PaymentsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface PaymentRepository extends MongoRepository<PaymentsModel,Long> {
    List<PaymentsModel> findAllByDashboardId(String dashboardId);
}
