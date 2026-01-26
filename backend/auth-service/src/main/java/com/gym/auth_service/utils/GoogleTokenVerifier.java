package com.gym.auth_service.utils;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class GoogleTokenVerifier {
    @Value("${google.client.id}")
    private String CLIENT_ID;

    public GoogleIdToken verify(String token) throws Exception {
        GoogleIdTokenVerifier verifier =
                new GoogleIdTokenVerifier.Builder(
                        new NetHttpTransport(),
                        JacksonFactory.getDefaultInstance()
                )
                        .setAudience(Collections.singletonList(CLIENT_ID))
                        .build();

        return verifier.verify(token);
    }

}
