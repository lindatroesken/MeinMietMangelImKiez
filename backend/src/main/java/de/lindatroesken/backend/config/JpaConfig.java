package de.lindatroesken.backend.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EntityScan(basePackages = {"de.lindatroesken.backend.model"})
@EnableJpaRepositories(basePackages = {"de.lindatroesken.backend.repo"})
@EnableTransactionManagement
public class JpaConfig {
}
