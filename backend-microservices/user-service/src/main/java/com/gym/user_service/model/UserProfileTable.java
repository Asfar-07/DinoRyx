package com.gym.user_service.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter
@Entity
@Table(name = "user_profile")
@NoArgsConstructor @AllArgsConstructor
@Builder
public class UserProfileTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "phone")
    private String phone_no;
    @Lob
    @Column(name = "about")
    private String about;
    @Column(name = "address")
    private String address;
    @Column(name = "dob")
    private String dob;
    @Column(name = "avatar")
    private String avatar;
    @Column(name = "gender")
    private String Gender;
    @Column(name = "update_date")
    private LocalDateTime updateDate;
    @Column(name="available")
    private  boolean available;
    @Column(name = "trainer")
    private boolean trainer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private UserTable user;
}
