package de.lindatroesken.backend.controller;


import de.lindatroesken.backend.api.Address;
import de.lindatroesken.backend.api.Credentials;
import de.lindatroesken.backend.api.User;
import de.lindatroesken.backend.config.JwtConfig;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;

import java.time.Duration;
import java.time.Instant;
import java.util.*;


import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@SpringBootTest(
        properties = "spring.profiles.active:h2",
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
public class UserControllerTest {

    @LocalServerPort
    private int port;

    private String getUrl(){
        return "http://localhost:"+port+"/user";
    }

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtConfig jwtConfig;

    @BeforeEach
    public void initializeDB(){

        UserEntity user1 = UserEntity.builder()
                .username("testuser")
                .password("$2a$10$3k.oydYW4Tvi2kpz7twi2.J.bXQWudC4.jEeYz7eScdedmNrg7chG")
                .role("user")
                .build();
        userRepository.save(user1);

        UserEntity user2 = UserEntity.builder()
                .username("testadmin")
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
    @DisplayName("GET should return a list of all users in database (2 users), if logged in as admin")
    public void TestGetListOfUsersShouldReturnTwoUsersForAdmin(){
        //GIVEN
        String authName = "testadmin";
        String authRole = "admin";
        String url = getUrl();
        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<User[]> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, User[].class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(),is(notNullValue()));
        assertThat(response.getBody().length, is(2));
    }

    @Test
    @DisplayName("GET for unauthorized user should return http status 401 UNAUTHORIZED")

    public void testGetListOfUsersShouldReturnError401(){
        //GIVEN
        String authName = "testuser";
        String authRole = "user";
        String url = getUrl();
        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<RestExceptionHandler.RestException> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, RestExceptionHandler.RestException.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
        assertThat(response.getBody(), is(notNullValue()));
        assertThat(response.getBody().getError(), is("Only admins are allowed to view all user"));


    }

    @Test
    @DisplayName("GET /{username} should return a user from database, if logged in as admin")
    public void testGetUserByUserNameReturnsUserIfAdmin(){
        //GIVEN
        String username = "testuser";
        String authName = "testadmin";
        String authRole = "admin";
        String url = getUrl() + "/" + username;
        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));
        // WHEN
        ResponseEntity<User> response = restTemplate.exchange(url,HttpMethod.GET,httpEntity, User.class);
        // THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(),is(notNullValue()));
        assertThat(response.getBody().getUsername(),is("testuser"));
    }


    @Test
    @DisplayName("GET /{username} for unauthorized user should return http status 401 UNAUTHORIZED")
    public void testGetUserByUserNameShouldReturnError401(){
        //GIVEN
        String username = "testuser";
        String authName = "testuser";
        String authRole = "user";
        String url = getUrl() + "/" + username;
        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));
        // WHEN
        ResponseEntity<User> response = restTemplate.exchange(url,HttpMethod.GET,httpEntity, User.class);
        // THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));

    }

    @Test
    @DisplayName("POST for authorized user should return address")
    public void testPostAddressforAuthorizedUserShouldReturnAddress(){
        //GIVEN
        String username = "testuser";
        String authName = "testuser";
        String authRole = "user";
        String url = getUrl() + "/address/new/" + username;
        Address address = Address.builder()
                .number("1")
                .zip("10000")
                .street("Strasse")
                .country("Deutschland")
                .city("Berlin")
                .build();
        HttpEntity<Address> httpEntity = new HttpEntity<>(address, authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<Address> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, Address.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(notNullValue()));
        assertThat(response.getBody().getCity(), is("Berlin"));
//        assertThat(response.getBody().getId(), is(notNullValue()));
    }


    private HttpHeaders authorizedHeader(String username, String role){
        Map<String,Object> claims = new HashMap<>();
        claims.put("role", role);
        Instant now = Instant.now();
        Date iat = Date.from(now);
        Date exp = Date.from(now.plus(Duration.ofMinutes(jwtConfig.getExpiresAfterMinutes())));
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(iat)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtConfig.getSecret())
                .compact();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        return headers;
    }


}
