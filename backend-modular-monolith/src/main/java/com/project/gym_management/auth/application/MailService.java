package com.project.gym_management.auth.application;

import com.project.gym_management.auth.domain.ResetPasswordTable;
import com.project.gym_management.auth.infrastructure.PasswordResetRepo;
import com.project.gym_management.common.captcha.CaptchaTokenUtil;
import com.project.gym_management.user.domain.UserTable;
import com.project.gym_management.user.infrastructure.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MailService {
    @Value("${client.server}")
    private String client;

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordResetRepo resetRepo;
    @Autowired
    private JavaMailSender mailSender;


    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void sendResetLink(String email) throws MessagingException {
        UserTable user=userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            System.out.println("No user found with this email");
            throw new IllegalArgumentException("No user found with this email");
        };
        String token = CaptchaTokenUtil.generateToken();                         //generate a token
        String tokenHash = passwordEncoder.encode(token);                        //hash token for more secure


        String resetUrl = client + "/reset-password?token=" + token; // pass token to url and not tokenHash
        ResetPasswordTable resetTokenTable= ResetPasswordTable.builder()
                        .email(email)
                              .user(user)
                                .token(tokenHash)
                                        .expiryTime(LocalDateTime.now().plusMinutes(3))
                                                .build();
               //make expire time (3 min)
        resetRepo.save(resetTokenTable);                                         // save detail of reset token to db

        MimeMessage message = mailSender.createMimeMessage();                    // call mailer
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("Password Reset OTP");
        helper.setText(
                "<h3>Reset Password Request</h3>" +
                        "<p>Click the button below to reset your password:</p>" +
                        "<a href='" + resetUrl + "' " +
                        "style='display:inline-block;padding:10px 20px;" +
                        "background:#4CAF50;color:#fff;text-decoration:none;" +
                        "border-radius:5px;'>Reset Password</a>" +
                        "<p>This link is valid for 3 minutes.</p>",
                true
        );

        mailSender.send(message);                                                // send mail to user with link
    }
}
