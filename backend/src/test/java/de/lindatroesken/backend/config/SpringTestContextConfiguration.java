package de.lindatroesken.backend.config;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabase;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;


@EnableAutoConfiguration
@ComponentScan(basePackages = {"de.lindatroesken.backend"})
@Import({JpaConfig.class})
@TestConfiguration
public class SpringTestContextConfiguration {


    @Primary
    @Bean(name = "dataSource", destroyMethod = "shutdown")
    public EmbeddedDatabase dataSource(){
        return new EmbeddedDatabaseBuilder()
                .setType(EmbeddedDatabaseType.H2)
                .build();
    }

}
