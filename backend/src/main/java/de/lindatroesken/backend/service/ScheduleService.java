package de.lindatroesken.backend.service;

import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.repo.MangelRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Slf4j
@Service
public class ScheduleService {

    private final MangelService mangelService;
    private final MangelRepository mangelRepository;

    @Autowired
    public ScheduleService(MangelService mangelService, MangelRepository mangelRepository) {
        this.mangelService = mangelService;
        this.mangelRepository = mangelRepository;
    }

    @Async
    @Scheduled(initialDelay=1000, fixedDelay=60000)
    public void checkDue(){

        List<MangelEntity> mangelEntityList = mangelService.findAllForAllUser();
        for (MangelEntity mangelEntity : mangelEntityList) {
            if (!mangelEntity.getStatus().toString().equals("DONE")
                && !mangelEntity.isDue()
                && ZonedDateTime.now().isAfter(mangelEntity.getDateReminder())) {
                    mangelEntity.setDue(true);
                    mangelRepository.save(mangelEntity);
                    log.info(String.format("Mangel %s set to due", mangelEntity.getId()));
            }
        }
    }


}
