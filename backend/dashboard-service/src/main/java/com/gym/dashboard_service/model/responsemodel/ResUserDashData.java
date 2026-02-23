package com.gym.dashboard_service.model.responsemodel;

import com.gym.dashboard_service.model.dashboardmodel.DashboardStructure;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResUserDashData  {

    public  ResUserDashData(DashboardStructure dashboard){
        this._id=dashboard.get_id();
        this.companyName=dashboard.getCompanyName();
        this.startedOrg=dashboard.getStartedOrg();
        this.created=dashboard.getCreated();
        this.owner=dashboard.getOwner();
        this.companyEmail=dashboard.getCompanyEmail();
        this.category=dashboard.getCategory();
        this.logo=dashboard.getLogo();
        this.about=dashboard.getAbout();
        this.address=dashboard.getAddress();
        this.certificate=dashboard.getCertificate();
        this.employees=dashboard.getEmployees();
        this.student=dashboard.getStudent();
        this.locationID=dashboard.getLocationID();
        this.organizer=false;
    }
    private String _id;
    private String companyName;
    private String startedOrg;
    private long created;
    private String owner;
    private String companyEmail;
    private String category;
    private String logo;
    private String about;
    private String address;
    private String certificate;
    private String employees;
    private int student;
    private long locationID;
    private boolean organizer;

    public void setOrganizer() {
        this.organizer = false;
    }

}
