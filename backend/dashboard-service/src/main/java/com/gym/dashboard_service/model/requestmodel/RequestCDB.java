package com.gym.dashboard_service.model.requestmodel;

import com.gym.dashboard_service.model.dashboardmodel.DashboardStructure;
import com.gym.dashboard_service.model.locationmodel.CompanyLocationModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCDB {
    private DashboardStructure companyData;
    private CompanyLocationModel location;
}
