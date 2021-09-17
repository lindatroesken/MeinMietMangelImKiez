package de.lindatroesken.backend.service;

import de.lindatroesken.backend.model.ContactLoggerEntity;
import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.MangelRepository;
import de.lindatroesken.backend.repo.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@Service
public class MangelService {

    private MangelRepository mangelRepository;
    private UserRepository userRepository;

    @Autowired
    public MangelService(MangelRepository mangelRepository, UserRepository userRepository) {
        this.mangelRepository = mangelRepository;
        this.userRepository = userRepository;
    }

    public List<MangelEntity> findAllForUser(String username) {

        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(EntityNotFoundException::new);

        return mangelRepository.findByUserEntity(userEntity);

    }

    public MangelEntity createMangelWithContactLoggerList(String username, MangelEntity newMangelEntity, List<ContactLoggerEntity> newContactLoggerList) {
        MangelEntity createdMangelEntity = createMangel(username, newMangelEntity);
        return addContactLoggerList(createdMangelEntity, newContactLoggerList);
    }

    public MangelEntity createMangel(String username, MangelEntity newMangelEntity){
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found"));
        newMangelEntity.setUserEntity(userEntity);
        return mangelRepository.save(newMangelEntity);
    }

    public MangelEntity addContactLoggerList(MangelEntity mangelEntity, List<ContactLoggerEntity> contactLoggerList){
        List<ContactLoggerEntity> createdContactLoggerList = new LinkedList<>();
        for (ContactLoggerEntity contactLoggerEntity : contactLoggerList){
            contactLoggerEntity.setMangelEntity(mangelEntity);
            createdContactLoggerList.add(contactLoggerEntity);
        }
        mangelEntity.setContactLoggerList(createdContactLoggerList);
        return mangelRepository.save(mangelEntity);

    }

    public MangelEntity findMangelById(Long id) {
        return mangelRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Mangel not found"));
    }

    public MangelEntity updateMangel(Long id, MangelEntity changedMangel) {
//        MangelEntity originalMangel = mangelRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Mangel not found"));
//        MangelEntity existingMangel = copyMangelEntity(originalMangel);
        MangelEntity existingMangel = mangelRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Mangel not found"));

        if (changedMangel.getCategory() != null) {
            existingMangel.setCategory(changedMangel.getCategory());
        }
        if (changedMangel.getStatus() != null) {
            existingMangel.setStatus(changedMangel.getStatus());
        }
        if (changedMangel.getDescription() != null){
            existingMangel.setDescription(changedMangel.getDescription());
        }
        if (changedMangel.getDateNoticed() != null){
            existingMangel.setDateNoticed(changedMangel.getDateNoticed());
        }
        if (changedMangel.getDetails() != null){
            existingMangel.setDetails(changedMangel.getDetails());
        }
        if (changedMangel.getDateFixed() != null){
            existingMangel.setDateFixed(changedMangel.getDateFixed());
        }
        if (changedMangel.getContactLoggerList() != null){
            existingMangel.setContactLoggerList(changedMangel.getContactLoggerList());
        }
        return mangelRepository.save(existingMangel);


    }

    private MangelEntity copyMangelEntity(MangelEntity originalMangel) {
        return MangelEntity.builder()
                .id(originalMangel.getId())
                .details(originalMangel.getDetails())
                .category(originalMangel.getCategory())
                .status(originalMangel.getStatus())
                .description(originalMangel.getDescription())
                .dateFixed(originalMangel.getDateFixed())
                .userEntity(originalMangel.getUserEntity())
                .dateNoticed(originalMangel.getDateNoticed())
                .build();
    }

}
