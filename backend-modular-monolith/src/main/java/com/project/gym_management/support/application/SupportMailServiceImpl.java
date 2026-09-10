package com.project.gym_management.support.application;

import com.project.gym_management.support.api.SupportMailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class SupportMailServiceImpl implements SupportMailService {

    private final JavaMailSender mailSender;

    public SupportMailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Override
    public void generalMailSender(String email, String subject, String body) throws MailException {

            MimeMessage message = mailSender.createMimeMessage();

            try {
                MimeMessageHelper helper =
                        new MimeMessageHelper(message, true);

                helper.setTo(email);
                helper.setSubject(subject);
                helper.setText(body,true);

                mailSender.send(message);

            } catch (MessagingException e) {
                throw new MailSendException("Failed to create reset email", e);
            }
        }
}
