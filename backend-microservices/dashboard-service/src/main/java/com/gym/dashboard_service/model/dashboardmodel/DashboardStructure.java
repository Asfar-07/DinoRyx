package com.gym.dashboard_service.model.dashboardmodel;
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
    private String _id;
    private String companyName;
    private long ownerID;
    private String startedOrg;
    private long created;
    private String owner;
    private String ownerEmail;
    private String companyEmail;
    private String category;
    private String logo;
    private String about;
    private String address;
    private String certificate;
    private String employees;
    private int student;
    private long locationID;
    private IncomeModel income;

}
