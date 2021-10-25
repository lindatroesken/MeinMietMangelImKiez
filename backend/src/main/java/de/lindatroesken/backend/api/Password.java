package de.lindatroesken.backend.api;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Password {

    @ApiModelProperty(example = "1234", notes = "current password")
    private String password;

    @ApiModelProperty(example = "1234", notes = "old password")
    private String oldPassword;



}
