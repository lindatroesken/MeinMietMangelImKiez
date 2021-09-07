package de.lindatroesken.backend.api;


import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @ApiModelProperty(required = true, example = "max123", notes = "The username of the user")
    private String username;
}
