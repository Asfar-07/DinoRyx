package com.project.gym_management.auth.infrastructure;

import com.project.gym_management.auth.domain.OtpVerificationTable;
import com.project.gym_management.auth.domain.enums.OtpPurpose;
import com.project.gym_management.user.domain.UserTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerificationTable, Long> {

    Optional<OtpVerificationTable> findTopByUserIdAndPurposeOrderByCreatedAtDesc(
            Long userId,
            OtpPurpose purpose
    );

    @Modifying
    @Query("""
    UPDATE OtpVerificationTable o
    SET o.verified = true
    WHERE o.user.id = :userId
      AND o.purpose = :purpose
      AND o.verified = false
""")
    void invalidatePreviousOtps(
            Long userId,
            OtpPurpose purpose
    );

    Optional<OtpVerificationTable> findTopByUser_IdAndPurposeOrderByCreatedAtDesc(
            Long userId, OtpPurpose purpose);
}
