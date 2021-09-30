package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.*;
import de.lindatroesken.backend.model.*;

import java.time.Instant;
import java.time.Period;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

abstract class ControllerMapper {

    public User mapUser(UserEntity userEntity) {
        return User.builder()
                .username(userEntity.getUsername())
                .build();
    }

    public List<User> mapUser(List<UserEntity> userEntityList) {
        List<User> userList = new LinkedList<>();
        for(UserEntity userEntity: userEntityList){
            User user = mapUser(userEntity);
            userList.add(user);
        }
        return userList;
    }

    public AddressEntity mapAddress(Address address){
        if (address == null){
            return null;
        }
        return AddressEntity.builder()
                .id(address.getId())
                .city(address.getCity())
                .country(address.getCountry())
                .zip(address.getZip())
                .street(address.getStreet())
                .number(address.getNumber())
                .build();

    }

    public Address mapAddress(AddressEntity addressEntity){
        if(addressEntity == null){
            return null;
        }
        return Address.builder()
                .id(addressEntity.getId())
                .city(addressEntity.getCity())
                .country(addressEntity.getCountry())
                .zip(addressEntity.getZip())
                .street(addressEntity.getStreet())
                .number(addressEntity.getNumber())
                .build();
    }

    public List<Address> mapAddressListFromEntity(List<AddressEntity> addressEntityList){
        List<Address> addressList = new LinkedList<>();
        for(AddressEntity addressEntity : addressEntityList){
            addressList.add(mapAddress(addressEntity));
        }
        return addressList;
    }

    public List<Mangel> mapMangel(List<MangelEntity> mangelEntityList) {
        List<Mangel> mangelList = new LinkedList<>();
        for (MangelEntity mangelEntity : mangelEntityList){
            Mangel mangel = mapMangel(mangelEntity);
            mangelList.add(mangel);
        }
        return mangelList;

    }

    public Set<ContactLoggerEntity> mapContactLoggerListToEntity(List<ContactLogger> contactLoggerList) {
        Set<ContactLoggerEntity> contactLoggerEntityList = new HashSet<>();
        if (contactLoggerList != null){
            for (ContactLogger contactLogger : contactLoggerList) {
                ContactLoggerEntity contactLoggerEntity = mapContactLogger(contactLogger);
                contactLoggerEntityList.add(contactLoggerEntity);
            }
        }
        return contactLoggerEntityList;
    }

    public List<ContactLogger> mapContactLoggerListFromEntity(Set<ContactLoggerEntity> contactLoggerEntityList){
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

    public MangelStatistics mapMangelToStatistics(MangelEntity mangelEntity){
        return MangelStatistics.builder()
                .id(mangelEntity.getId())
                .latitude(mangelEntity.getAddressEntity().getLatitude())
                .longitude(mangelEntity.getAddressEntity().getLongitude())
                .category(mangelEntity.getCategory())
                .status(mangelEntity.getStatus().toString())
                .build();
    }

    public List<MangelStatistics> mapMangelToStatisticsList(List<MangelEntity> mangelEntityList){
        List<MangelStatistics> mangelStatisticsList = new LinkedList<>();
        for (MangelEntity mangelEntity : mangelEntityList) {
            mangelStatisticsList.add(mapMangelToStatistics(mangelEntity));
        }
        return mangelStatisticsList;
    }


    public MangelEntity mapMangel(Mangel mangel){
        return MangelEntity.builder()
                .description(mangel.getDescription())
                .details(mangel.getDetails())
                .category(mangel.getCategory())
                .status(stringToStatus(mangel.getStatus()))
                .dateNoticed(convertLongToZonedDateTime(mangel.getDateNoticed()))
                .dateReminder(intToDateReminder(mangel.getRemindMeInDays()))
                .isDue(checkDue(Status.valueOf(mangel.getStatus()), intToDateReminder(mangel.getRemindMeInDays())))
                .addressEntity(mapAddress(mangel.getAddress()))
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
                .isDue(mangelEntity.isDue())
                .remindMeInDays(dateToIntReminder(mangelEntity.getDateReminder()))
                .address(mapAddress(mangelEntity.getAddressEntity()))
                .build();
    }

    public boolean checkDue(Status status, ZonedDateTime dueDate){
        if (status.toString().equals("DONE")){
            return false;
        }
        return ZonedDateTime.now().isAfter(dueDate);
    }

    private Status stringToStatus(String statusString){
        if (statusString==null){
            return null;
        }
        return Status.valueOf(statusString);
    }

    private ZonedDateTime intToDateReminder(int days){
        ZonedDateTime currentDate = ZonedDateTime.now();
        return currentDate.plusDays(days);
    }
    private int dateToIntReminder(ZonedDateTime date){
        if (date != null) {
            ZonedDateTime currentDate = ZonedDateTime.now();
            return Period.between(currentDate.toLocalDate(), date.toLocalDate()).getDays();
        }
        return 0;
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
