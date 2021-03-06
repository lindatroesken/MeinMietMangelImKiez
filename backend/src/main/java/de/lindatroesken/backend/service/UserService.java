package de.lindatroesken.backend.service;

import de.lindatroesken.backend.controller.UnauthorizedUserException;
import de.lindatroesken.backend.model.AddressEntity;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.AddressRepository;
import de.lindatroesken.backend.repo.UserRepository;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Set;

@Slf4j
@Getter
@Setter
@Service
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final MapboxService mapboxService;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, AddressRepository addressRepository, MapboxService mapboxService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.mapboxService = mapboxService;
        this.passwordEncoder = passwordEncoder;
    }


    public List<UserEntity> findAll() {
        return userRepository.findAll();
    }

    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public AddressEntity addNewAddress(String username, AddressEntity addressEntity) {
        UserEntity userEntity = findByUsername(username);
        Set<AddressEntity> existingUserAddresses = userEntity.getAddressList();
        if(addressExists(existingUserAddresses, addressEntity)){
            throw new EntityExistsException("Address already exists");
        }
        addressEntity.setUserEntity(userEntity);
        AddressEntity savedAddress = addressRepository.save(addressEntity);
        mapboxService.getGeoLocation(savedAddress.getId(), addressEntity.toString());

        return savedAddress;

    }



    public boolean addressExists(Set<AddressEntity> existingAddressList, AddressEntity addressToCheck){
        for (AddressEntity address : existingAddressList){
            if (address.getStreet().equals(addressToCheck.getStreet())
                    && address.getNumber().equals(addressToCheck.getNumber())
                    && address.getZip().equals(addressToCheck.getZip())
                    && address.getCity().equals(addressToCheck.getCity()))
            {
                return true;
            }
        }
        return false;
    }

    public List<AddressEntity> findAddressByUsername(String username) {
        UserEntity userEntity = findByUsername(username);
        return addressRepository.findAllByUserEntity(userEntity);
    }

    public AddressEntity editAddress(String username, Long addressId, AddressEntity addressEntity) {
        if (!addressEntity.getId().equals(addressId)){
            throw new IllegalArgumentException("Request body and ID doe not match");
        }
        UserEntity userEntity = findByUsername(username);
        Set<AddressEntity> existingUserAddresses = userEntity.getAddressList();
        if(addressExists(existingUserAddresses, addressEntity)){
            throw new EntityExistsException("Address already exists");
        }
        AddressEntity existingAddressEntity = addressRepository.findById(addressId).orElseThrow(() -> new EntityNotFoundException("Address not found"));
        if (!existingAddressEntity.getUserEntity().equals(userEntity)){
            throw new UnauthorizedUserException("User can only edit own address");
        }
        if (addressEntity.getStreet() != null && !addressEntity.getStreet().equals(existingAddressEntity.getStreet())){
            existingAddressEntity.setStreet(addressEntity.getStreet());
        }
        if (addressEntity.getNumber() != null && !addressEntity.getNumber().equals(existingAddressEntity.getNumber())){
            existingAddressEntity.setNumber(addressEntity.getNumber());
        }
        if (addressEntity.getZip() != null && !addressEntity.getZip().equals(existingAddressEntity.getZip())){
            existingAddressEntity.setZip(addressEntity.getZip());
        }
        if (addressEntity.getCity() != null && !addressEntity.getCity().equals(existingAddressEntity.getCity())){
            existingAddressEntity.setCity(addressEntity.getCity());
        }
        if (addressEntity.getCountry() != null && !addressEntity.getCountry().equals(existingAddressEntity.getCountry())){
            existingAddressEntity.setCountry(addressEntity.getCountry());
        }
        addressRepository.save(existingAddressEntity);

        mapboxService.getGeoLocation(existingAddressEntity.getId(), existingAddressEntity.toString());

        return existingAddressEntity;


    }

    public AddressEntity findAddressById(Long addressId) {
        return addressRepository.findById(addressId).orElseThrow(() -> new EntityNotFoundException("Address not found"));

    }

    public AddressEntity deleteAddress(String username, Long addressId) {
        UserEntity userEntity = findByUsername(username);
        AddressEntity existingAddressEntity = addressRepository.findById(addressId).orElseThrow(() -> new EntityNotFoundException("Address not found"));
        if (!existingAddressEntity.getUserEntity().equals(userEntity)){
            throw new IllegalArgumentException("Address and user does not match");
        }
        if (existingAddressEntity.getMangelList().size()>0){
            throw new IllegalArgumentException("Cannot delete address, because address has at least one mangel. Delete or change mangel first.");
        }
        userEntity.removeAddress(existingAddressEntity);
        userRepository.save(userEntity);
        log.info("Address deleted");
        return existingAddressEntity;
    }

    public UserEntity createUser(UserEntity newUser, String password) {
        if(userRepository.findByUsername(newUser.getUsername()).isPresent()){
            log.info("User not created, because username already exists");
            throw new EntityExistsException("User not created, because username already exists");
        }
        String hashedPassword = passwordEncoder.encode(password);
        newUser.setPassword(hashedPassword);
        newUser.setRole("user");
        return userRepository.save(newUser);
    }

    public UserEntity deleteUser(String username) {
        UserEntity userToDelete = findByUsername(username);
        userRepository.delete(userToDelete);
        log.info("User deleted");
        return userToDelete;
    }

    public UserEntity editUsername(String oldUsername, String newUsername) {
        if(userRepository.findByUsername(newUsername).isPresent()){
            log.info("Username not changed, because username already exists");
            throw new EntityExistsException("Username not changed, because username already exists");
        }
        UserEntity existingUser = userRepository.findByUsername(oldUsername).orElseThrow(() -> new EntityNotFoundException("User not found"));
        existingUser.setUsername(newUsername);
        return userRepository.save(existingUser);
    }

    public UserEntity updatePassword(String username, String password) {
        UserEntity user = findByUsername(username);
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        log.info("New password set");
        return userRepository.save(user);
    }

    public UserEntity editEmail(String username, String email) {
        UserEntity user = findByUsername(username);
        user.setEmail(email);
        log.info("Email changed");
        return userRepository.save(user);
    }
}

