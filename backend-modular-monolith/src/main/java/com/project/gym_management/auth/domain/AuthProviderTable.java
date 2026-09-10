package com.project.gym_management.auth.domain;

import com.project.gym_management.auth.domain.enums.AuthProvider;
import com.project.gym_management.user.domain.UserTable;
import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@Entity
@Table(name = "auth_provider",
uniqueConstraints = {
          @UniqueConstraint(
               name = "unique_user_provider",
               columnNames = {"user_id", "provider"}
          )
    })
@NoArgsConstructor @AllArgsConstructor
@Builder
public class AuthProviderTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserTable user;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false)
    private AuthProvider provider;

    @Column(name = "password")
    private String password;

}
