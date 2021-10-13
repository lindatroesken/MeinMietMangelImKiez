package de.lindatroesken.backend.api;


import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserRegister {

    @ApiModelProperty(required = true, example = "max123", notes = "The username of the user")
    private String username;

    @ApiModelProperty(required = true, example = "12345", notes = "The password of the user")
    private String password;

    @ApiModelProperty(example = "user", notes = "The role of the user (user or admin)")
    private String role = "user";

    @ApiModelProperty(notes = "The address of the user")
    private Address address;

}
