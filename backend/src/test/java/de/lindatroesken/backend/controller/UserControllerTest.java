package de.lindatroesken.backend.controller;


import de.lindatroesken.backend.api.*;
import de.lindatroesken.backend.config.JwtConfig;
import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.MangelRepository;
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
import java.time.ZonedDateTime;
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

    private final TestRestTemplate restTemplate;
    private final UserRepository userRepository;
    private final MangelRepository mangelRepository;
    private final JwtConfig jwtConfig;



    @Autowired
    public UserControllerTest(TestRestTemplate restTemplate, UserRepository userRepository, MangelRepository mangelRepository, JwtConfig jwtConfig) {
        this.restTemplate = restTemplate;
        this.userRepository = userRepository;
        this.mangelRepository = mangelRepository;
        this.jwtConfig = jwtConfig;
    }

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

        MangelEntity mangel1 = MangelEntity.builder()
                .userEntity(user1)
                .category("Heizung")
                .description("kaputt")
                .dateNoticed(ZonedDateTime.now())
                .build();
        mangelRepository.save(mangel1);

    }

    @AfterEach
    public void clearDB() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("GET should return a list of all users in database (2 users), if logged in as admin")
    public void testGetListOfUsersShouldReturnTwoUsersForAdmin(){
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
    @DisplayName("POST should create a new user in database")
    public void testPostRegisterShouldCreateUser(){
        //GIVEN
        String username = "newuser";
        String password = "1234";
        UserRegister newUser = UserRegister.builder().username(username).password(password).build();
        String url = getUrl() + "/register";
        HttpEntity<UserRegister> httpEntity = new HttpEntity<>(newUser);

        //WHEN
        ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, User.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(notNullValue()));
        assertThat(response.getBody().getUsername(),is(username));
    }

    @Test
    @DisplayName("POST for already existing username should return 409 CONFLICT")
    public void testPostRegisterUsernameExistsShouldReturnError409(){
        //GIVEN
        String username = "testuser";
        String password = "1234";
        UserRegister newUser = UserRegister.builder().username(username).password(password).build();
        String url = getUrl() + "/register";
        HttpEntity<UserRegister> httpEntity = new HttpEntity<>(newUser);

        //WHEN
        ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, User.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.CONFLICT));

    }

    @Test
    @DisplayName("PUT should update username")
    public void testPutEditUsernameShouldUpdateUsername(){
        //GIVEN
        String username = "newusername";
        String authName = "testuser";
        String authRole = "user";
        User updateUser = User.builder().username(username).build();
        String url = getUrl() + "/username/edit";
        HttpEntity<User> httpEntity = new HttpEntity<>(updateUser, authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, User.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(notNullValue()));
        assertThat(response.getBody().getUsername(),is(username));
    }

    @Test
    @DisplayName("PUT with existing username should return error 409")
    public void testPutEditUsernameAlreadyExistsShouldReturnError409(){
        //GIVEN
        String username = "testadmin";
        String authName = "testuser";
        String authRole = "user";
        User updateUser = User.builder().username(username).build();
        String url = getUrl() + "/username/edit";
        HttpEntity<User> httpEntity = new HttpEntity<>(updateUser, authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, User.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.CONFLICT));
    }

    @Test
    @DisplayName("Delete should delete own user account")
    public void testDeleteOwnAccount(){
        //GIVEN
        String username = "testuser";
        String authName = "testuser";
        String authRole = "user";
        String url = getUrl() + "/" + username + "/delete";
        int sizeBefore = userRepository.findAll().size();

        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, User.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(userRepository.findAll().size(), is(sizeBefore-1));
        assertThat(userRepository.findByUsername(username), is(Optional.empty()));
    }

    @Test
    @DisplayName("Delete of other username should return Error 401")
    public void testDeleteOtherAccountShouldReturnError401(){
        //GIVEN
        String username = "testadmin";
        String authName = "testuser";
        String authRole = "user";
        String url = getUrl() + "/" + username + "/delete";
        int sizeBefore = userRepository.findAll().size();

        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, User.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));
        assertThat(userRepository.findAll().size(), is(sizeBefore));
        assertThat(userRepository.findByUsername(username), is(notNullValue()));
    }

    @Test
    @DisplayName("Delete as admin should return ok")
    public void testDeleteAsAdminShouldReturnOk(){
        //GIVEN
        String username = "testuser";
        String authName = "testadmin";
        String authRole = "admin";
        String url = getUrl() + "/" + username + "/delete";
        int sizeBefore = userRepository.findAll().size();

        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));

        //WHEN
        ResponseEntity<User> response = restTemplate.exchange(url, HttpMethod.DELETE, httpEntity, User.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(userRepository.findAll().size(), is(sizeBefore-1));
        assertThat(userRepository.findByUsername(username), is(Optional.empty()));
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
        assertThat(response.getBody().getMessage(), is("Only admins are allowed to view all user"));


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
        String username = "testadmin";
        String authName = "testuser";
        String authRole = "user";
        String url = getUrl() + "/" + username;
        HttpEntity<Credentials> httpEntity = new HttpEntity<>(authorizedHeader(authName, authRole));
        // WHEN
        ResponseEntity<User> response = restTemplate.exchange(url,HttpMethod.GET,httpEntity, User.class);
        // THEN
        assertThat(response.getStatusCode(), is(HttpStatus.UNAUTHORIZED));

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
