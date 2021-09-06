package de.lindatroesken.backend.api;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Credentials {
    private String username;
    private String password;
}
