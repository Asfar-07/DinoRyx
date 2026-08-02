package com.project.gym_management.common.cookie;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

public class CookieManage {
    private final HttpServletResponse response;
    public CookieManage(HttpServletResponse response){
        this.response=response;
    }
    public void createCookie(String accessToken,String refreshToken){
        ResponseCookie accessCookie= ResponseCookie.from("SecuredJWT",accessToken).httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(15 * 60)
                .build();
        ResponseCookie refreshCookie= ResponseCookie.from("SecuredREFRESH",refreshToken).httpOnly(true)
                .secure(false)
                .path("/auth/refresh")
                .sameSite("Lax")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        this.response.addHeader(HttpHeaders.SET_COOKIE,accessCookie.toString());
        this.response.addHeader(HttpHeaders.SET_COOKIE,refreshCookie.toString());
    }
    public void removeCookie(){
        ResponseCookie accessCookie= ResponseCookie.from("SecuredJWT",null).httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(0)
                .build();
        ResponseCookie refreshCookie= ResponseCookie.from("SecuredREFRESH",null).httpOnly(true)
                .secure(false)
                .path("/auth/refresh")
                .sameSite("Lax")
                .maxAge(0)
                .build();
        this.response.addHeader(HttpHeaders.SET_COOKIE,accessCookie.toString());
        this.response.addHeader(HttpHeaders.SET_COOKIE,refreshCookie.toString());
    }

}
