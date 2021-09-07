package de.lindatroesken.backend;

import de.lindatroesken.backend.config.SpringTestContextConfiguration;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = SpringTestContextConfiguration.class)
public abstract class SpringBootTests {

}
