package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.ContactLog;
import de.lindatroesken.backend.api.Mangel;
import de.lindatroesken.backend.model.ContactLoggerEntity;
import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.Status;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

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
                .dateNoticed(convertLongToZonedDateTime(mangel.getDateNoticed()))
                .build();
    }
    public Mangel mapMangel(MangelEntity mangelEntity) {
        return Mangel.builder()
                .dateNoticed(convertZonedDateTimeToLong(mangelEntity.getDateNoticed()))
                .description(mangelEntity.getDescription())
                .details(mangelEntity.getDetails())
                .category(mangelEntity.getCategory())
                .status(mangelEntity.getStatus().toString())
                .id(mangelEntity.getId())
                .build();
    }

    public ZonedDateTime convertLongToZonedDateTime(Long date){
        try {
            return ZonedDateTime.ofInstant(Instant.ofEpochMilli(date),
                    ZoneId.systemDefault());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

    public Long convertZonedDateTimeToLong(ZonedDateTime date){
        try {
            return date.toInstant().toEpochMilli();
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
