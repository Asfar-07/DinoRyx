package com.gym.dashboard_service.service;

import com.gym.dashboard_service.exception.ResourceNotFoundException;
import com.gym.dashboard_service.model.dashboardmodel.DashboardStructure;
import com.gym.dashboard_service.model.locationmodel.CompanyLocationModel;
import com.gym.dashboard_service.model.requestmodel.RequestCDB;
import com.gym.dashboard_service.model.responsemodel.ResOwnerDashData;
import com.gym.dashboard_service.model.responsemodel.ResUserDashData;
import com.gym.dashboard_service.repository.DashboardRepository;
import com.gym.dashboard_service.repository.LocationRepository;
import com.gym.dashboard_service.utils.CreateRandomKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private final DashboardRepository dashboardRepository;
    private final LocationRepository locationRepository;

    public DashboardService(DashboardRepository dashboardRepository, LocationRepository locationRepository) {
        this.dashboardRepository = dashboardRepository;
        this.locationRepository = locationRepository;
    }

    public String createDashboardService(RequestCDB requestCDB){
        DashboardStructure dashboard= requestCDB.getCompanyData();
        CompanyLocationModel location= requestCDB.getLocation();

        StringBuilder dashboardId=new CreateRandomKey().alphaWITH_num();  //make dashboard if for db
        long locationId=new CreateRandomKey().onlyNumber();  //make location id for db


        if (location.getLongitude() != 0 && location.getLatitude() != 0){  //make sure location available
            location.set_id(locationId);
            location.setCategory(dashboard.getCategory());
            locationRepository.save(location);
            dashboard.setLocationID(locationId);
        }else{
            dashboard.setLocationID(0);
        }

        Date date = new Date(System.currentTimeMillis());
        dashboard.setCreated(date.getTime());
        dashboard.set_id(String.valueOf(dashboardId));
        dashboard.setOwnerID(12345);

        dashboardRepository.save(dashboard);

        return String.valueOf(dashboardId);
    }
    public ArrayList<Object> getDashboardData(long userId, String DashboardId){
        DashboardStructure dashboard=dashboardRepository.findBy_id(DashboardId).orElseThrow(
                ()-> new ResourceNotFoundException("dash not found")
        );
        ArrayList<Object> response=new ArrayList<>();
        if(dashboard != null){
            CompanyLocationModel location=locationRepository.findById(dashboard.getLocationID()).orElse(null);
            if (dashboard.getOwnerID() == userId){
                response.add(new ResOwnerDashData(dashboard));
                response.add(location);
                return response;
            }else{
                response.add(new ResUserDashData(dashboard));
                response.add(location);
                return response;
            }
        }
        return null;
    }
    public List<CompanyLocationModel> getFullLocation(){
        List<CompanyLocationModel> allLocation=locationRepository.findAll();
        return allLocation;
    }
}
