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
public class MangelStatistics {

    @ApiModelProperty(notes="id")
    private Long id;

    @ApiModelProperty(notes = "latitude")
    private double latitude;

    @ApiModelProperty(notes = "longitude")
    private double longitude;

    @ApiModelProperty(notes = "category")
    private String category;

    @ApiModelProperty(notes="status")
    private String status;

    @ApiModelProperty(notes="date noticed")
    private Long dateNoticed;

}
