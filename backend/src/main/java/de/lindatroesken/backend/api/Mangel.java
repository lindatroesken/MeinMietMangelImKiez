package de.lindatroesken.backend.api;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Mangel {

    @ApiModelProperty(notes = "id of issue")
    private Long id;

    @ApiModelProperty(notes = "A description of the problem")
    private String description;

    @ApiModelProperty(notes = "more details, if there is more to say")
    private String details;

    @ApiModelProperty(notes = "date of first problem occurrence")
    private Long dateNoticed;

    @ApiModelProperty(notes = "remind in xxx days")
    private int remindMeInDays;

    @ApiModelProperty(notes = "date of problem solved")
    private String dateFixed;

    @ApiModelProperty(notes = "status of issue")
    private String status;

    @ApiModelProperty(notes = "category of issue")
    private String category;

    @ApiModelProperty(notes = "logger for contact to landlord")
    private List<ContactLogger> contactLoggerList;

    @ApiModelProperty(notes = "mangel is due (not done and remind date elapsed")
    private boolean isDue;

    @ApiModelProperty(notes = "address of mangel")
    private Address address;

}
