package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.AccessToken;
import de.lindatroesken.backend.api.Credentials;
import de.lindatroesken.backend.api.User;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class AuthControllerTest {
    @LocalServerPort
    private int port;

    private String getUrl(){
        return "http://localhost:"+port+"/auth";
    }
    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    public void initializeDB(){

        UserEntity user1 = UserEntity.builder()
                .username("linda")
                .password("$2a$10$3k.oydYW4Tvi2kpz7twi2.J.bXQWudC4.jEeYz7eScdedmNrg7chG")
                .role("user")
                .build();
        userRepository.save(user1);

        UserEntity user2 = UserEntity.builder()
                .username("admin")
                .password("$2a$10$3k.oydYW4Tvi2kpz7twi2.J.bXQWudC4.jEeYz7eScdedmNrg7chG")
                .role("admin")
                .build();
        userRepository.save(user2);

    }

    @AfterEach
    public void clearDB() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("POST should return token (still a hard coded token, to be replaced!)")
    public void testPostReturnsAccessToken(){
        //GIVEN
        String url = getUrl() + "/access_token";
        Credentials credentials = Credentials.builder()
                .username("linda")
                .password("1234").build();
        // WHEN
        ResponseEntity<AccessToken> response = restTemplate.postForEntity(url, credentials, AccessToken.class);

        // THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertNotNull(response.getBody());
        String token = response.getBody().getToken();
        assertThat(token, is("1234"));


    }



}