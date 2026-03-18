package com.gym.user_service.repository;

import com.gym.user_service.model.UserTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserTable, Long> {

    Optional<UserTable> findById(long id);

    @Query("SELECT u FROM UserTable u LEFT JOIN FETCH u.profile WHERE u.id = :id")
    Optional<UserTable> findByIdWithProfile(long id);

}
