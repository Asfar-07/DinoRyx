package com.gym.dashboard_service.model.responsemodel;

import com.gym.dashboard_service.model.dashboardmodel.DashboardStructure;
import com.gym.dashboard_service.model.amountmodel.IncomeModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResOwnerDashData  {
    public ResOwnerDashData(DashboardStructure dashboard){
        this._id=dashboard.get_id();
        this.companyName=dashboard.getCompanyName();
        this.startedOrg=dashboard.getStartedOrg();
        this.created=dashboard.getCreated();
        this.owner=dashboard.getOwner();
        this.ownerEmail= dashboard.getOwnerEmail();
        this.companyEmail=dashboard.getCompanyEmail();
        this.category=dashboard.getCategory();
        this.logo=dashboard.getLogo();
        this.about=dashboard.getAbout();
        this.address=dashboard.getAddress();
        this.certificate=dashboard.getCertificate();
        this.employees=dashboard.getEmployees();
        this.student=dashboard.getStudent();
        this.locationID=dashboard.getLocationID();
        this.income=dashboard.getIncome();
        this.isOwner=true;
    }
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
    private boolean isOwner;
    private boolean organizer;

    public void setOrganizer() {
        organizer = false;
    }
}
