package de.lindatroesken.backend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "address")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddressEntity {

    @Column(name = "id", nullable = false)
    @Id
    @GeneratedValue
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity userEntity;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "addressEntity", fetch = FetchType.EAGER)
    private Set<MangelEntity> mangelList;

    @Column(name = "street")
    private String street;

    @Column(name = "number")
    private String number;

    @Column(name="zip_code")
    private String zip;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;


    @Override
    public int hashCode() {
        if (getId() == null){
            return getClass().hashCode();
        }
        return getId().hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressEntity that = (AddressEntity) o;
        return id.equals(that.id);
    }

}
