package de.lindatroesken.backend.repo;

import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MangelRepository extends JpaRepository<MangelEntity, Long> {

    List<MangelEntity> findByUserEntityOrderByDateNoticedDesc(UserEntity userEntity);

}
