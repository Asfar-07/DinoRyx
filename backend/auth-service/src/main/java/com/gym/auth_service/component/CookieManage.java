package com.gym.auth_service.utils;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

public class CookieManage {
    private final HttpServletResponse response;
    public CookieManage(HttpServletResponse response){
        this.response=response;
    }
    public void createCookie(String Token){
        ResponseCookie cookie= ResponseCookie.from("SecuredJWT",Token).httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(15 * 60)
                .build();
        this.response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());
    }
    public void removeCookie(){
        ResponseCookie cookie= ResponseCookie.from("SecuredJWT",null).httpOnly(true)
                .secure(false)
                .path("/")
                .sameSite("Lax")
                .maxAge(0)
                .build();
        this.response.addHeader(HttpHeaders.SET_COOKIE,cookie.toString());
    }

}
