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
public class Mangel {

    @ApiModelProperty(notes = "id of issue")
    private Long id;

    @ApiModelProperty(example = "Heizungsausfall in der gesamten Wohnung", notes = "A description of the problem")
    private String description;

    @ApiModelProperty(notes = "date of first problem occurance")
    private String dateNoticed;

    @ApiModelProperty(notes = "date of problem solved")
    private String dateFixed;

    @ApiModelProperty(notes = "status of issue")
    private String status;

    @ApiModelProperty(notes = "category of issue")
    private String category;


}
