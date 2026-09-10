package com.project.gym_management.auth.application;

import com.project.gym_management.user.domain.UserTable;
import jakarta.mail.MessagingException;

public interface AuthMailVerification {
    void sendResetPasswordLink(String email) throws MessagingException;
    void sendSignupOtp(UserTable user);
    void ResendSignupOtp(UserTable user);
}
