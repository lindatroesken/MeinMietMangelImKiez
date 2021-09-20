package de.lindatroesken.backend.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "address")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressEntity {

    @Column(name = "address_id", nullable = false)
    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity userEntity;

    @Column(name="zip_code")
    private String zip;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

}
