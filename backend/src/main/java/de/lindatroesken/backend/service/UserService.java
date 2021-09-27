package de.lindatroesken.backend.service;

import com.mapbox.api.geocoding.v5.MapboxGeocoding;
import com.mapbox.api.geocoding.v5.models.CarmenFeature;
import com.mapbox.api.geocoding.v5.models.GeocodingResponse;
import de.lindatroesken.backend.config.MapboxClientConfigProperties;
import de.lindatroesken.backend.controller.UnauthorizedUserException;
import de.lindatroesken.backend.model.AddressEntity;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.repo.AddressRepository;
import de.lindatroesken.backend.repo.UserRepository;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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
    private final MapboxClientConfigProperties mapboxClientConfigProperties;

    @Autowired
    public UserService(UserRepository userRepository, AddressRepository addressRepository, MapboxClientConfigProperties mapboxClientConfigProperties) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.mapboxClientConfigProperties = mapboxClientConfigProperties;
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
        AddressEntity createdAddress = userEntity.addAddress(addressEntity);
        userRepository.save(userEntity);
        getGeoLocation(addressEntity);

        return createdAddress;

    }

    public void getGeoLocation(AddressEntity addressEntity){
        String addressString = new StringBuilder()
                .append(addressEntity.getStreet())
                .append(" ")
                .append(addressEntity.getNumber())
                .append(", ")
                .append(addressEntity.getZip())
                .append(" ")
                .append(addressEntity.getCity())
                .append(", ")
                .append(addressEntity.getCountry()).toString();

        String mapboxToken = mapboxClientConfigProperties.getAccessToken();

        MapboxGeocoding mapboxGeocoding = MapboxGeocoding.builder()
                .accessToken(mapboxToken)
                .query(addressString)
                .build();

        mapboxGeocoding.enqueueCall(new Callback<GeocodingResponse>() {
            @Override
            public void onResponse(Call<GeocodingResponse> call, Response<GeocodingResponse> response) {
                List<CarmenFeature> results = response.body().features();
                double relevance = 0;
                List<Double> coordinates;
                if (results.size() > 0) {
                    coordinates = results.get(0).center().coordinates();

                    addressEntity.setLatitude(coordinates.get(0));
                    addressEntity.setLongitude(coordinates.get(1));

                    addressRepository.save(addressEntity);
                    log.info("mapbox onResponse: coordinates saved to address");

                } else {
                    log.info("mapbox onResponse: No result found for this address");
                }
            }

            @Override
            public void onFailure(Call<GeocodingResponse> call, Throwable throwable) {
                log.info("mapbox onFailure: some problem....");
                throwable.printStackTrace();
            }
        });
    }

    public boolean addressExists(Set<AddressEntity> existingAddressList, AddressEntity addressToCheck){
        for (AddressEntity address : existingAddressList){
            if (address.getStreet().equals(addressToCheck.getStreet())
                    && address.getNumber().equals(addressToCheck.getNumber())
                    && address.getZip().equals(addressToCheck.getZip())
                    && address.getCity().equals(addressToCheck.getCity())
                    && address.getCountry().equals(addressToCheck.getCountry())
            ) {return true;}
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
        return addressRepository.save(existingAddressEntity);
    }
}

