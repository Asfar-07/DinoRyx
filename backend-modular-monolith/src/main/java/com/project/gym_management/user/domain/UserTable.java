package com.project.gym_management.user.domain;

import com.project.gym_management.auth.domain.AuthProviderTable;
import com.project.gym_management.auth.domain.ResetPasswordTable;
import com.project.gym_management.user.domain.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@Entity
@Table(name="users")
@NoArgsConstructor @AllArgsConstructor
@Builder
public class UserTable {
    @Id
    private long id;

    @Column(name = "username",nullable = false,length = 20)
    private String username;

    @Column(name = "email",nullable = false,updatable = false,unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    @Builder.Default
    private UserStatus status = UserStatus.PENDING;

    @Column(name = "created_at",nullable = false,updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private UserProfileTable profile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ResetPasswordTable> resetPassword;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<AuthProviderTable> provider;


    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
