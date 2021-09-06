package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.AccessToken;
import de.lindatroesken.backend.api.Credentials;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.util.Assert.hasText;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    public static final String ACCESS_TOKEN_URL = "/access_token";


    @PostMapping(value = ACCESS_TOKEN_URL, produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<AccessToken> getAccessToken(@RequestBody Credentials credentials){
        String username = credentials.getUsername();
        hasText(username, "Username must not be blank to get token");
        String password = credentials.getPassword();
        hasText(password, "Password must not be blank to get token");


        return ResponseEntity.ok(AccessToken.builder().token("1234").build());
    }

}
