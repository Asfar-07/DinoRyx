package com.project.gym_management.auth.infrastructure;

import com.project.gym_management.auth.domain.AuthProviderTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProviderRepository extends JpaRepository<AuthProviderTable,Long> {
    List<AuthProviderTable> findByUserId(long userId);

    Optional<AuthProviderTable> findByProviderAndUserId(String provider, long userId);

}
