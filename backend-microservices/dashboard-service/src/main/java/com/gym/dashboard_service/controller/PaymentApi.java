package com.gym.dashboard_service.controller;

import com.gym.dashboard_service.model.amountmodel.PaymentsModel;
import com.gym.dashboard_service.service.hidden.PaymentServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class PaymentApi {
    @Autowired
    PaymentServiceImp service;
    @GetMapping(value = "/fetch/payment/record")
    public ResponseEntity<?> GetRecord(@RequestParam("dashID") String dashId){
        List<?> allRecord=service.getAllPayments(dashId);
        return ResponseEntity.ok(allRecord);
    }
    @PostMapping(value="/save/payment/record")
    public ResponseEntity<?> SetRecord(@RequestBody PaymentsModel billRecord){
        service.savePaymentRecord(billRecord);
        return ResponseEntity.ok("success");
    }


}
