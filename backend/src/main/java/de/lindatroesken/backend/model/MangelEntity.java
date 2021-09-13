package de.lindatroesken.backend.model;

import lombok.*;

import javax.persistence.*;

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

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private UserEntity userEntity;


    @Column(name="description", columnDefinition="TEXT")
    private String description;

    @Column(name = "date_noticed")
//    private LocalDateTime dateNoticed;
    private String dateNoticed;

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
