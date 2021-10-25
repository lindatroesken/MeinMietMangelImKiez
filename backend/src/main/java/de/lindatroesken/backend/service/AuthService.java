package de.lindatroesken.backend.service;

import de.lindatroesken.backend.api.AccessToken;
import de.lindatroesken.backend.controller.UnauthorizedUserException;
import de.lindatroesken.backend.model.UserEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;
import java.util.NoSuchElementException;

@Service
public class AuthService {

    private final int MINLENGTH = 4;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthService(AuthenticationManager authenticationManager, UserService userService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtService = jwtService;
    }


    public void checkPassword(String password){
        Assert.hasText(password, "Password must not be blank");
        if (password.length()<MINLENGTH){
            throw new IllegalArgumentException("Password to short. Minimum length is " + MINLENGTH);
        }
    }

    public void validateCredentials(String username, String password) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                username,
                password
        );
        try {
            authenticationManager.authenticate(authToken);
        } catch (AuthenticationException e){
            throw new UnauthorizedUserException("bad credentials");
        } catch (NoSuchElementException e){
            throw new EntityNotFoundException("bad credentials");
        }
    }


    public AccessToken getAccessToken(String username) {
        UserEntity user = userService.findByUsername(username);
        String token = jwtService.createJwtToken(user);
        return AccessToken.builder()
                .token(token).build();
    }
}
