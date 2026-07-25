package com.gym.auth_service.repository;

import com.gym.auth_service.model.ResetPasswordTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PasswordResetRepo extends JpaRepository<ResetPasswordTable, Long> {
    Optional<ResetPasswordTable> findByEmail(String email);

    // JPQL (Java Persistence Query Language) not sql.
    // 'select table' return collection 'ResetPasswordTable table' is an Entity class name
    // add condition table.used = false, table.expiryTime > :now
    @Query(""" 
    SELECT table FROM ResetPasswordTable table
    WHERE table.used = false
    AND table.expiryTime > :now
    """)
    List<ResetPasswordTable> findAllValidation(@Param("now") LocalDateTime now); //named parameter
}
