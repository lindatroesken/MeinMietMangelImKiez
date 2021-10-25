package de.lindatroesken.backend.api;


import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @ApiModelProperty(required = true, example = "max123", notes = "The username of the user")
    private String username;

    @ApiModelProperty(notes = "The email address for the user. Is needed for password reset")
    private String email;

    @ApiModelProperty(example = "user", notes = "The role of the user (user or admin)")
    private String role;
}
