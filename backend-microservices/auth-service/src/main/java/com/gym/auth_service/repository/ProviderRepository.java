package com.gym.auth_service.repository;

import com.gym.auth_service.model.AuthProviderTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProviderRepository extends JpaRepository<AuthProviderTable,Long> {
    List<AuthProviderTable> findByUserId(long userId);

    Optional<AuthProviderTable> findByProviderAndUserId(String provider, long userId);

}
