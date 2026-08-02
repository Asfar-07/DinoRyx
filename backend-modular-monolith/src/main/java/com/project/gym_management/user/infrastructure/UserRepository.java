package com.project.gym_management.user.infrastructure;

import com.project.gym_management.user.domain.UserTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserTable, Long> {

    Optional<UserTable> findById(long id);
    Optional<UserTable> findByEmail(String email);

    @Query("SELECT u FROM UserTable u LEFT JOIN FETCH u.profile WHERE u.id = :id")
    Optional<UserTable> findByIdWithProfile(long id);

    @Query("SELECT u FROM UserTable u LEFT JOIN FETCH u.provider WHERE u.id = :id")
    Optional<UserTable> findByIdWithProvider(long id);
}
