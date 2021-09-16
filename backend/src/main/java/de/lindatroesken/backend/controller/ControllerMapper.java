package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.Mangel;
import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.Status;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;

abstract class ControllerMapper {

    public List<Mangel> mapMangel(List<MangelEntity> mangelEntityList) {
        List<Mangel> mangelList = new LinkedList<>();
        for (MangelEntity mangelEntity : mangelEntityList){
            Mangel mangel = mapMangel(mangelEntity);
            mangelList.add(mangel);
        }
        return mangelList;

    }

    public MangelEntity mapMangel(Mangel mangel){
        return MangelEntity.builder()
                .description(mangel.getDescription())
                .details(mangel.getDetails())
                .category(mangel.getCategory())
                .status(Status.valueOf(mangel.getStatus()))
                .dateNoticed(ZonedDateTime.ofInstant(Instant.ofEpochMilli(mangel.getDateNoticed()),
                        ZoneId.systemDefault()))
                .build();
    }
    public Mangel mapMangel(MangelEntity mangelEntity) {
        return Mangel.builder()
                .dateNoticed(mangelEntity.getDateNoticed().toInstant().toEpochMilli())
                .description(mangelEntity.getDescription())
                .details(mangelEntity.getDetails())
                .category(mangelEntity.getCategory())
                .status(mangelEntity.getStatus().toString())
                .id(mangelEntity.getId())
                .build();
    }
}
