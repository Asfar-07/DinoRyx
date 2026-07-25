package com.gym.dashboard_service.service.hidden;

import com.gym.dashboard_service.model.amountmodel.PaymentsModel;
import com.gym.dashboard_service.repository.PaymentRepository;
import com.gym.dashboard_service.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PaymentServiceImp implements PaymentService {

    @Autowired
    private final PaymentRepository paymentRepository;

    public PaymentServiceImp(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    @Override
    public List<?> getAllPayments(String dashId){
        return  paymentRepository.findAllByDashboardId(dashId);
    }
    @Override
    public void savePaymentRecord(PaymentsModel paymentsModel){
        Date date = new Date(System.currentTimeMillis());
        paymentsModel.setPaid_Date(date.getTime());
        paymentRepository.save(paymentsModel);
    }
}
