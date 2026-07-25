package com.gym.dashboard_service.service;

import com.gym.dashboard_service.model.locationmodel.CompanyLocationModel;
import com.gym.dashboard_service.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    public final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<CompanyLocationModel> getFullLocation(){
        return locationRepository.findAll();
    }
    public void addLocation(CompanyLocationModel location){
        locationRepository.save(location);

    }

}
