package com.gym.dashboard_service.controller;

import com.gym.dashboard_service.model.requestmodel.RequestCDB;
import com.gym.dashboard_service.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;


@RestController
@RequestMapping("/dashboard")
public class DashboardApi {
    @Autowired
    DashboardService service;

    @PostMapping(value = "/create/working/dashboard")
    public ResponseEntity<?> CreateDashboard(@RequestBody RequestCDB request){
        String DashID=service.createDashboardService(request);
        return ResponseEntity.ok(DashID);
    }
    @GetMapping(value = "/give/data/client")
    public  ResponseEntity<?> DashboardDataToClient(@RequestParam("dashId") String dashId){
        ArrayList<Object> data=service.getDashboardData(12345,dashId);
       return ResponseEntity.ok(data);
    }

}
