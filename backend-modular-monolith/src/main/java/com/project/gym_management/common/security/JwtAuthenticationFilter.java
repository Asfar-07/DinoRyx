package com.project.gym_management.common.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenManage jwtTokenManage;

    public JwtAuthenticationFilter(JwtTokenManage jwtTokenManage) {
        this.jwtTokenManage = jwtTokenManage;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        System.out.println("Incoming request: " + request.getMethod() + " " + request.getRequestURI());
        String path = request.getRequestURI();
        if (path.startsWith("/auth")) {  //pass request with no condition
            chain.doFilter(request, response);
            return;
        }

        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            chain.doFilter(request, response);
            return;
        }
        String token = resolveTokenFromCookie(request);

        if (token == null) {
            unauthorized(response, "Missing JWT");
            return;
        }
        try {
            Claims claims = jwtTokenManage.validateToken(token);
            String userId = claims.get("sub", String.class);
            String email = claims.get("email", String.class);

            // instead of mutating headers, attach directly to the request object
            request.setAttribute("userId", userId);
            request.setAttribute("email", email);

            Authentication auth = new UsernamePasswordAuthenticationToken(
                    userId, null, Collections.emptyList()
            );
            SecurityContextHolder.getContext().setAuthentication(auth);

            chain.doFilter(request, response); // continues to controller with attributes attached

        } catch (Exception e) {
            unauthorized(response, "Invalid or expired JWT");
        }

    }

    private String resolveTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if ("SecuredJWT".equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    private void unauthorized(HttpServletResponse response, String msg) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        System.out.println("Unauthorized: " + msg);
        response.getWriter().write("{\"error\": \"" + msg + "\"}");
    }

}