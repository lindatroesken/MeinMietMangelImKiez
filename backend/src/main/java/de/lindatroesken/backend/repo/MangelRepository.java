package de.lindatroesken.backend.repo;

import de.lindatroesken.backend.model.MangelEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MangelRepository extends JpaRepository<MangelEntity, Long> {

}
