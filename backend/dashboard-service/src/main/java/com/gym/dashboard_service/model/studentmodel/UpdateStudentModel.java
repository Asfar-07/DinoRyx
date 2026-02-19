package com.gym.dashboard_service.model.studentmodel;

import com.gym.dashboard_service.model.amountmodel.PaymentsModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateStudentModel {

    private long _id;
    private String name;
    private int age;
    private String join_date;
    private String progressStatus;
    private String address;
    private String contact;
    private long update_Date;
    private boolean connection;
    private List<Long> connectionMsg;
    private List<PaymentsModel> payments;
    private List<StudentChallenges> challenges;
}
