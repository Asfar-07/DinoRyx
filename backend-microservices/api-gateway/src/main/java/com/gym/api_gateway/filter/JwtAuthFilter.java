package com.gym.api_gateway.filter;

import com.gym.api_gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter implements GlobalFilter, Ordered {
    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getPath().toString(); //get request path
        System.out.println(path);
        if (path.startsWith("/auth")) {  //pass request with no condition
            return chain.filter(exchange);
        }
        if (path.startsWith("/dashboard")) {  //pass request with no condition
            return chain.filter(exchange);
        }
        if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        // get the cookie from http
        HttpCookie userCookie = exchange.getRequest()
                .getCookies()
                .getFirst("SecuredJWT");
        System.out.println(userCookie);

        //if cookie, avoiding pass data to another server
        if (userCookie == null) {
            return unauthorized(exchange, "Missing JWT");
        }

        try {
            String token = userCookie.getValue();
            Claims claims=jwtUtil.validateToken(token); // check cookie validation (expire time, genuine)
            String userId = claims.get("sub", String.class);
            String email = claims.get("email", String.class); // extract header from jwt
            ServerHttpRequest mutatedRequest = exchange.getRequest()
                    .mutate()
                    .header("User-ID",userId)
                    .header("Email-ID", email) //gateway include header in http
                    .build();
            ServerWebExchange mutatedExchange = exchange.mutate()
                    .request(mutatedRequest)
                    .build();
            return chain.filter(mutatedExchange);
        } catch (Exception e) {
            return unauthorized(exchange, "Invalid or expired JWT");
        }
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String msg) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        System.out.println("Unauthorized: " + msg);
        return exchange.getResponse().setComplete();
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
