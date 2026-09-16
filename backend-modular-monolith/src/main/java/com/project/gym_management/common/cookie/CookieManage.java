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
        ResponseCookie accessCookie = ResponseCookie.from("SecuredJWT", accessToken)
                .httpOnly(true)
                .secure(true)              // required on Render (HTTPS)
                .path("/")
                .sameSite("None")          // required for cross-site requests
                .maxAge(15 * 60)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("SecuredREFRESH", refreshToken)
                .httpOnly(true)
                .secure(true)
                .path("/auth/refresh")
                .sameSite("None")
                .maxAge(7 * 24 * 60 * 60)
                .build();
        this.response.addHeader(HttpHeaders.SET_COOKIE,accessCookie.toString());
        this.response.addHeader(HttpHeaders.SET_COOKIE,refreshCookie.toString());
    }

    public void removeCookie() {

        ResponseCookie accessCookie = ResponseCookie.from("SecuredJWT", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .sameSite("None")
                .maxAge(0)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("SecuredREFRESH", "")
                .httpOnly(true)
                .secure(true)
                .path("/auth/refresh")
                .sameSite("None")
                .maxAge(0)
                .build();

        this.response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        this.response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());
    }

}
