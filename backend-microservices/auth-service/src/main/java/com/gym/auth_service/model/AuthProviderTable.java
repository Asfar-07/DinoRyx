package com.gym.auth_service.model;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@Entity
@Table(name = "auth_provider")
@NoArgsConstructor @AllArgsConstructor
@Builder
public class AuthProviderTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserTable user;

    @Column(name = "provider",nullable = false)
    private String provider;

    @Column(name = "password")
    private String password;
}
