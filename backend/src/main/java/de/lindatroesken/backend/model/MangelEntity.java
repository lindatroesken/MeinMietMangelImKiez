package de.lindatroesken.backend.model;

import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@Table(name = "mangel")
@Setter
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class MangelEntity {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_entity")
    private UserEntity userEntity;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "mangelEntity", fetch = FetchType.EAGER)
    private Set<ContactLoggerEntity> contactLoggerList;

    @Column(name="details", columnDefinition="TEXT")
    private String details;

    @Column(name="description")
    private String description;

    @Column(name = "date_noticed")
    private ZonedDateTime dateNoticed;

    @Column(name = "date_reminder")
    private ZonedDateTime dateReminder;

    @Column(name = "date_fixed")
    private ZonedDateTime dateFixed;

    @Column(name = "category")
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "is_due")
    private boolean isDue;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "address_entity")
    private AddressEntity addressEntity;

    public void addContactLogger(ContactLoggerEntity contactLoggerEntity){
        contactLoggerList.add(contactLoggerEntity);
        contactLoggerEntity.setMangelEntity(this);
    }

    public MangelEntity remove(ContactLoggerEntity contactLoggerEntity){
        contactLoggerList.remove(contactLoggerEntity);
        contactLoggerEntity.setMangelEntity(null);
        return this;
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MangelEntity that = (MangelEntity) o;
        return id.equals(that.id);
    }
}
