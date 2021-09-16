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
    @JoinColumn(name="user")
    private UserEntity userEntity;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "mangelEntity", fetch = FetchType.EAGER)
    private Set<ContactLoggerEntity> contactLoggerList;

    @Column(name="details", columnDefinition="TEXT")
    private String details;

    @Column(name="description")
    private String description;

    @Column(name = "date_noticed")
    private ZonedDateTime dateNoticed;

    @Column(name = "date_fixed")
    private ZonedDateTime dateFixed;

    @Column(name = "category")
    private String category;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;


    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
