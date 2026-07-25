package com.gym.dashboard_service.model.amountmodel;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(value = "paymentRecord")
public class PaymentsModel {
    @Id
    private String _id;
    private long studentId;
    private boolean present;
    private long amount;
    private String date;
    private String discount;
    private String dashboardId;
    private long paid_Date;
}
