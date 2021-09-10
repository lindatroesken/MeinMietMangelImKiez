package de.lindatroesken.backend.model;

import de.lindatroesken.backend.SpringBootTests;
import de.lindatroesken.backend.repo.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class UserEntityTest extends SpringBootTests {

    @Resource
    private UserRepository userRepository;

    @Test
    @Transactional
    @DisplayName("Find user by username should return found user")
    public void findUserByUsername(){
        // GIVEN
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("linda");
        userEntity.setPassword("1234");
        UserEntity expectedUser = userRepository.save(userEntity);

        // WHEN
        Optional<UserEntity> actualUserOptional = userRepository.findByUsername("linda");

        // THEN
        assertTrue(actualUserOptional.isPresent());
        assertThat(actualUserOptional.get().getUsername(), is(expectedUser.getUsername()));
    }

    @Test
    @Transactional
    @DisplayName("Find user by username should return empty optional, if user is not found")
    public void findUserNotInDatabase(){
        // GIVEN
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername("linda");
        userEntity.setPassword("1234");
        userRepository.save(userEntity);

        // WHEN
        Optional<UserEntity> actualUserOptional = userRepository.findByUsername("Linda");

        // THEN
        assertTrue(actualUserOptional.isEmpty());
    }
}
