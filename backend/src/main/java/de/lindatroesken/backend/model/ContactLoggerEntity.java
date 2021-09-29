package de.lindatroesken.backend.model;

import lombok.*;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "contact_logger")
@Setter
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
public class ContactLoggerEntity {

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "mangel_entity")
    private MangelEntity mangelEntity;

    @Enumerated(EnumType.STRING)
    @Column(name = "contact_type")
    private ContactType contactType;

    @Column(name = "date_contacted")
    private ZonedDateTime dateContacted;

    @Column(name = "contact_note")
    private String contactNote;


    @Override
    public int hashCode() {
        return getId() == null ? getDateContacted().hashCode() : getId().hashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContactLoggerEntity that = (ContactLoggerEntity) o;
        return id.equals(that.id);
    }

    @Override
    public String toString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy - HH:mm");
        return  dateContacted.format(formatter) +
                ", " + contactType +
                ", " + contactNote;
    }

}
