package com.gym.dashboard_service.model.amountmodel;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentsModel {

    private long amount;
    private String date;
    private String discount;
    private long paid_Date;
}
