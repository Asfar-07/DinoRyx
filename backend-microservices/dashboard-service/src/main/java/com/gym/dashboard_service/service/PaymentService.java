package com.gym.dashboard_service.service;

import com.gym.dashboard_service.model.amountmodel.PaymentsModel;
import java.util.List;


public interface PaymentService {
    List<?> getAllPayments(String dashId);
    void savePaymentRecord(PaymentsModel paymentsModel);
}
