package de.lindatroesken.backend.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mangel {

    @ApiModelProperty(example = "Heizungsausfall in der gesamten Wohnung", notes = "A description of the problem")
    private String description;

    @ApiModelProperty(notes = "date of first problem occurance")
    private Instant dateNoticed;
}
