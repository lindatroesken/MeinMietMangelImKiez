package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.AccessToken;
import de.lindatroesken.backend.api.Credentials;
import de.lindatroesken.backend.service.AuthService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;


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
    private final AuthService authService;


    @Autowired
    public AuthController(AuthenticationManager authenticationManager, AuthService authService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
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
        authService.validateCredentials(username, password);
        AccessToken accessToken = authService.getAccessToken(username);
        return ResponseEntity.ok(accessToken);

    }


}
