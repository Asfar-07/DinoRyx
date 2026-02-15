package com.gym.dashboard_service.model.locationmodel;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Getter
@Setter
@Document(collection = "companyLocation")
public class CompanyLocationModel {
    @Id
    private long _id;
    private String companyName;
    private String address;
    private float latitude;
    private float longitude;
}
