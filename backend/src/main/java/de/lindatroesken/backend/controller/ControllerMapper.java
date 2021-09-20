package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.ContactLogger;
import de.lindatroesken.backend.api.Mangel;
import de.lindatroesken.backend.model.ContactLoggerEntity;
import de.lindatroesken.backend.model.ContactType;
import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.Status;

import java.time.Instant;
import java.time.Period;
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

    public List<ContactLoggerEntity> mapContactLoggerListToEntity(List<ContactLogger> contactLoggerList) {
        List<ContactLoggerEntity> contactLoggerEntityList = new LinkedList<>();
        if (contactLoggerList != null){
            for (ContactLogger contactLogger : contactLoggerList) {
                ContactLoggerEntity contactLoggerEntity = mapContactLogger(contactLogger);
                contactLoggerEntityList.add(contactLoggerEntity);
            }
        }
        return contactLoggerEntityList;
    }

    public List<ContactLogger> mapContactLoggerListFromEntity(List<ContactLoggerEntity> contactLoggerEntityList){
        List<ContactLogger> contactLoggerList = new LinkedList<>();
        if (contactLoggerEntityList != null){
            for (ContactLoggerEntity contactLoggerEntity : contactLoggerEntityList){
                ContactLogger contactLogger = mapContactLogger(contactLoggerEntity);
                contactLoggerList.add(contactLogger);
            }
        }
        return contactLoggerList;
    }

    public ContactLoggerEntity mapContactLogger(ContactLogger contactLogger){
        return ContactLoggerEntity.builder()
                .id(contactLogger.getId())
                .contactType(ContactType.valueOf(contactLogger.getContactType()))
                .dateContacted(convertLongToZonedDateTime(contactLogger.getDateContacted()))
                .contactNote(contactLogger.getContactNote())
                .build();
    }
    public ContactLogger mapContactLogger(ContactLoggerEntity contactLoggerEntity){
        return ContactLogger.builder()
                .id(contactLoggerEntity.getId())
                .contactNote(contactLoggerEntity.getContactNote())
                .contactType(contactLoggerEntity.getContactType().toString())
                .dateContacted(convertZonedDateTimeToLong(contactLoggerEntity.getDateContacted()))
                .build();
    }



    public MangelEntity mapMangel(Mangel mangel){
        return MangelEntity.builder()
                .description(mangel.getDescription())
                .details(mangel.getDetails())
                .category(mangel.getCategory())
                .status(Status.valueOf(mangel.getStatus()))
                .dateNoticed(convertLongToZonedDateTime(mangel.getDateNoticed()))
                .dateReminder(intToDateReminder(mangel.getRemindMeInDays()))
                .isDue(checkDue(Status.valueOf(mangel.getStatus()), intToDateReminder(mangel.getRemindMeInDays())))
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
                .contactLoggerList(mapContactLoggerListFromEntity(mangelEntity.getContactLoggerList()))
                .isDue(checkDue(mangelEntity.getStatus(), mangelEntity.getDateReminder()))
                .remindMeInDays(dateToIntReminder(mangelEntity.getDateReminder()))
                .build();
    }

    public boolean checkDue(Status status, ZonedDateTime dueDate){
        if (status.toString().equals("DONE")){
            return false;
        }
        return ZonedDateTime.now().isAfter(dueDate);
    }

    private ZonedDateTime intToDateReminder(int days){
        ZonedDateTime currentDate = ZonedDateTime.now();
        return currentDate.plusDays(days);
    }
    private int dateToIntReminder(ZonedDateTime date){
        ZonedDateTime currentDate = ZonedDateTime.now();
        return Period.between(currentDate.toLocalDate(), date.toLocalDate()).getDays();
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
