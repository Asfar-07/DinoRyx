package com.gym.auth_service.repository;

import com.gym.auth_service.model.PasswordResetForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PasswordResetRepo extends JpaRepository<PasswordResetForm, Long> {
    Optional<PasswordResetForm> findByEmail(String email);

    // JPQL (Java Persistence Query Language) not sql.
    // 'select table' return collection 'PasswordResetForm table' is an Entity class name
    // add condition table.used = false, table.expiryTime > :now
    @Query(""" 
    SELECT table FROM PasswordResetForm table
    WHERE table.used = false
    AND table.expiryTime > :now
    """)
    List<PasswordResetForm> findAllValidation(@Param("now") LocalDateTime now); //named parameter
}
