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
public class Address {
    @ApiModelProperty(notes = "id of address")
    private Long id;

    @ApiModelProperty(notes = "zip code")
    private String zip;

    @ApiModelProperty(notes = "city")
    private String city;

    @ApiModelProperty(notes = "street")
    private String street;

    @ApiModelProperty(notes = "number")
    private String number;

    @ApiModelProperty(notes = "country")
    private String country;


}
