package de.lindatroesken.backend.repo;

import de.lindatroesken.backend.model.ContactLoggerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactLoggerRepository extends JpaRepository<ContactLoggerEntity, Long> {
}
