package com.gym.auth_service.repository;

import com.gym.auth_service.model.UserProfileTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<UserProfileTable, Long> {
    Optional<UserProfileTable> findById(long id);
}
