package de.lindatroesken.backend.service;

import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Getter
@Setter
@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }
}

