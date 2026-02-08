package com.gym.dashboard_service.service;

import com.gym.dashboard_service.model.DashboardStructure;
import com.gym.dashboard_service.model.locationmodel.CompanyLocationModel;
import com.gym.dashboard_service.repository.DashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private final DashboardRepository dashboardRepository;

    public DashboardService( DashboardRepository dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    public void createDashboardService(DashboardStructure dashboardStructure){
        dashboardRepository.save(dashboardStructure);
    }
}
