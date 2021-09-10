package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.AccessToken;
import de.lindatroesken.backend.api.Credentials;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.service.JwtService;
import de.lindatroesken.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;


import static de.lindatroesken.backend.controller.AuthController.CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.*;
import static org.springframework.util.Assert.hasText;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;


@Tag(name = CONTROLLER_TAG, description = "Provides authorization methods, to get a token")
@Api(tags = CONTROLLER_TAG)
@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    public static final String ACCESS_TOKEN_URL = "/access_token";
    public static final String CONTROLLER_TAG = "Authorization Controller";
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @ApiResponses(value = {
            @ApiResponse(code = SC_NOT_FOUND, message = "User not found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "User not found")
    })
    @PostMapping(value = ACCESS_TOKEN_URL, produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<AccessToken> getAccessToken(@RequestBody Credentials credentials){
        String username = credentials.getUsername();
        hasText(username, "Username must not be blank to get token");
        String password = credentials.getPassword();
        hasText(password, "Password must not be blank to get token");
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                username,
                password
        );
        try {
            authenticationManager.authenticate(authToken);
            UserEntity user = userService.findByUsername(username).orElseThrow();
            String token = jwtService.createJwtToken(user);
            AccessToken accessToken = AccessToken.builder()
                    .token(token).build();
            return ResponseEntity.ok(accessToken);
        } catch (AuthenticationException e){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }

}
