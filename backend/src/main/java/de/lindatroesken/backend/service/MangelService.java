package de.lindatroesken.backend.service;

import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.MangelRepository;
import de.lindatroesken.backend.repo.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@Service
public class MangelService {

    private MangelRepository mangelRepository;
    private UserRepository userRepository;

    @Autowired
    public MangelService(MangelRepository mangelRepository, UserRepository userRepository) {
        this.mangelRepository = mangelRepository;
        this.userRepository = userRepository;
    }

    public List<MangelEntity> findAllForUser(String username) {

        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow();

        return mangelRepository.findByUserEntity(userEntity);

    }

    public MangelEntity createMangel(String username, MangelEntity newMangelEntity) {
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow();
        newMangelEntity.setUserEntity(userEntity);
        userEntity.addMangel(newMangelEntity);
        userRepository.save(userEntity);
        return newMangelEntity;
    }
}
