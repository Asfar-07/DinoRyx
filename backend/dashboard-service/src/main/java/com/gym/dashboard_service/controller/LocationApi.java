package com.gym.dashboard_service.controller;


import com.gym.dashboard_service.model.locationmodel.CompanyLocationModel;
import com.gym.dashboard_service.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class LocationApi {
    @Autowired
    LocationService locationService;

    @GetMapping(value = "/get/all/location")
    public ResponseEntity<?> FetchAllLocation(){
        List<CompanyLocationModel> data=locationService.getFullLocation();
        return ResponseEntity.ok(data);
    }
}
