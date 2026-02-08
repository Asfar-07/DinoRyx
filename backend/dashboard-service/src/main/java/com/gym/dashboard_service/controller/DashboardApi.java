package com.gym.dashboard_service.controller;

import com.gym.dashboard_service.model.DashboardStructure;
import com.gym.dashboard_service.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardApi {
    @Autowired
    DashboardService service;

    @PostMapping(value = "/create/working/dashboard")
    public void CreateDashboard(@RequestBody DashboardStructure dashboardStructure){
        service.createDashboardService(dashboardStructure);
    }
}
