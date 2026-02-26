package com.gym.dashboard_service.model.studentmodel;

import com.gym.dashboard_service.model.amountmodel.PaymentsModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(value = "students")
public class StudentModel {
    @Id
    @Indexed(unique = true)
    private long _id;
    private String name;
    private int age;
    private String join_date;
    private String dashboardId;
    private long UserId; // who added
    private String progressStatus;
    private String address;
    private  String program;
    private String contact;
    private long created;
    private long update_Date;
    private boolean connection;
    private List<Long> connectionMsg;
    private List<PaymentsModel> payments;
    private List<StudentChallenges> challenges;

}
