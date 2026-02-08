package com.gym.dashboard_service.model;
import com.gym.dashboard_service.model.amountmodel.IncomeModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection = "workDashboard")
public class DashboardStructure {

    @Id
    @Indexed(unique = true)
    private long _id;
    private String companyName;
    private long userID;
    private long created;
    private String email;
    private String owner;
    private String category;
    private String logo;
    private String about;
    private String certificate;
    private String employees;
    private int student;
    private long locationID;
    private IncomeModel income;


}
