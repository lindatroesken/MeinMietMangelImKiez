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
public class ContactLog {
    @ApiModelProperty(notes = "id of issue")
    private Long id;
    @ApiModelProperty(notes = "type of contact, e.g. email, phone, letter, ...")
    private String contactType;
    @ApiModelProperty(notes = "date of contact")
    private Long dateContacted;
    @ApiModelProperty(notes = "some notes")
    private String contactNote;

}
