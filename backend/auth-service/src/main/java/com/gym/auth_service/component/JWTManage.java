package com.gym.auth_service.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTManage {
    @Value("${secret.key.jwt}")
    private String SECRET;
    public String generateToken(String email){
        long expireTime = 1000 * 60 * 15;
        String token = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+ expireTime))
                .signWith(Keys.hmacShaKeyFor(SECRET.getBytes()), SignatureAlgorithm.HS256)
                .compact();
        return token;
    }

}
