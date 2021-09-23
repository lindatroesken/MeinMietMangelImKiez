package de.lindatroesken.backend.filter;

import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    @Autowired
    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            if(authHeader != null){
                String token = authHeader.replace("Bearer", "").trim();
                Claims claims = jwtService.getClaims(token);
                String username = claims.getSubject();
                String role = claims.get("role",String.class);

                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                UserEntity.builder()
                                .username(username)
                                .role(role).build(),
                                "",
                                List.of(new SimpleGrantedAuthority(role))
                        )
                );
            }
        } catch (JwtException e){
            log.error("Unable to parse JWT", e);
        }

        filterChain.doFilter(request, response);
    }
}
