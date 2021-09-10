package de.lindatroesken.backend.service;

import de.lindatroesken.backend.repo.MangelRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
@Service
public class MangelService {

    private MangelRepository mangelRepository;

    public MangelService(MangelRepository mangelRepository) {
        this.mangelRepository = mangelRepository;
    }
}
