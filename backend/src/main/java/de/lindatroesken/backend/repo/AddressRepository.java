package de.lindatroesken.backend.repo;

import de.lindatroesken.backend.model.AddressEntity;
import de.lindatroesken.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<AddressEntity, Long> {


    List<AddressEntity> findAllByUserEntity(UserEntity userEntity);
}
