package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.ContactLogger;
import de.lindatroesken.backend.api.Mangel;
import de.lindatroesken.backend.api.MangelStatistics;
import de.lindatroesken.backend.model.ContactLoggerEntity;
import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.service.MangelService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

import static de.lindatroesken.backend.controller.MangelController.CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = CONTROLLER_TAG, description = "Provides methods to create, edit, delete a mangel")
@Api(tags = CONTROLLER_TAG)
@CrossOrigin
@RestController
@RequestMapping("/mangel")
public class MangelController extends ControllerMapper {
    public static final String CONTROLLER_TAG = "Mangel Controller";

    private final MangelService mangelService;

    @Autowired
    public MangelController(MangelService mangelService) {
        this.mangelService = mangelService;
    }

    @GetMapping(value = "findall/{username}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only view own mangel overview")
    })
    public ResponseEntity<List<Mangel>> findAllByUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username){
        if(authUser.getUsername().equals(username)){
            List<MangelEntity> mangelEntityList = mangelService.findAllForUser(username);
            return ok(mapMangel(mangelEntityList));
        }
        throw new UnauthorizedUserException("User can only view own mangel overview");
    }

    @GetMapping(value = "finddue/{username}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only view own mangel overview")
    })
    public ResponseEntity<List<Mangel>> findAllDueByUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username){
        if(authUser.getUsername().equals(username)){
            List<MangelEntity> mangelEntityList = mangelService.findAllDueForUser(username);
            return ok(mapMangel(mangelEntityList));
        }
        throw new UnauthorizedUserException("User can only view own mangel overview");
    }

    @GetMapping(value = "find/{mangelId}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user can only view own mangel")
    })
    public ResponseEntity<Mangel> findMangelById(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long mangelId){
        MangelEntity mangelEntity = mangelService.findMangelById(mangelId);
        if(mangelEntity.getUserEntity().getUsername().equals(authUser.getUsername())){
            return ok(mapMangel(mangelEntity));
        }
        throw new UnauthorizedUserException("User can only view own mangel");
    }

    @PutMapping(value = "update/{mangelId}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user can only update own mangel")
    })
    public ResponseEntity<Mangel> updateMangel(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long mangelId, @RequestBody Mangel updateMangel){
        if(updateMangel.getId().equals(mangelId)){
            MangelEntity changedMangelEntity = mangelService.updateMangel(mangelId, authUser.getUsername(), mapMangel(updateMangel));
            return ok(mapMangel(changedMangelEntity));
        }
        throw new IllegalArgumentException("Mangel and ID does not belong together");
    }

    @PostMapping(value = "new/{username}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user can only create a mangel for own user")
    })
    public ResponseEntity<Mangel> createNewMangelWithContactLogger(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username, @RequestBody Mangel newMangel){
        if(authUser.getUsername().equals(username)){
            MangelEntity mangelEntity = mapMangel(newMangel);
            Set<ContactLoggerEntity> contactLoggerEntityList = mapContactLoggerListToEntity(newMangel.getContactLoggerList());
            MangelEntity mangelEntityCreated = mangelService.createMangelWithContactLoggerList(username, mangelEntity, contactLoggerEntityList);
            return ok(mapMangel(mangelEntityCreated));
        }
        throw new UnauthorizedUserException("Only logged in user can create a mangel in own list");
    }

    @PostMapping(value = "contact/add/{mangelId}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user can only add own mangel")
    })
    public ResponseEntity<Mangel> addContactLogToMangel(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long mangelId, @RequestBody ContactLogger contactLogger){
        MangelEntity updatedMangel = mangelService.addContactLoggerToList(mangelId, authUser.getUsername(), mapContactLogger(contactLogger));
        return ok(mapMangel(updatedMangel));
    }

    @PutMapping(value = "contact/edit/{mangelId}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only edit own mangel")
    })
    public ResponseEntity<Mangel> updateContactLog(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long mangelId, @RequestBody ContactLogger contactLogger){
        MangelEntity updatedMangel = mangelService.updateContactLogger(mangelId, authUser.getUsername(), mapContactLogger(contactLogger));
        return ok(mapMangel(updatedMangel));
    }

    @DeleteMapping(value = "contact/delete/{mangelId}/{contactId}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only delete own contact log")
    })
    public ResponseEntity<ContactLogger> deleteContactLog(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long mangelId, @PathVariable Long contactId){
        ContactLoggerEntity deletedContact = mangelService.deleteContactLog(authUser.getUsername(), mangelId, contactId);
        return ok(mapContactLogger(deletedContact));
    }

    @DeleteMapping(value = "delete/{mangelId}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only delete own mangel")
    })
    public ResponseEntity<Mangel> deleteMangel(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long mangelId){
        MangelEntity deletedMangel = mangelService.deleteMangel(authUser.getUsername(), mangelId);
        return ok(mapMangel(deletedMangel));
    }

    @GetMapping(value = "statistics/all", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only delete own mangel")
    })
    public ResponseEntity<List<MangelStatistics>> getAllLocations(@AuthenticationPrincipal UserEntity authUser){
        List<MangelEntity> mangelEntityList = mangelService.findAllForAllUser();
        return ok(mapMangelToStatisticsList(mangelEntityList));
    }

    @GetMapping(value = "export/csv/all", produces = "text/csv")
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only export own mangel list")
    })
    public void exportToCSV(HttpServletResponse response, @AuthenticationPrincipal UserEntity authUser){
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=mangellist_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);

        List<MangelEntity> mangelEntityList = mangelService.findAllForUser(authUser.getUsername());


        try {
           ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
            String[] csvHeader = {"Mangel ID", "Kategorie", "Beschreibung", "Status", "Date Noticed", "Date Fixed", "Vermieter kontaktiert"};
            String[] nameMapping = {"id", "category", "description", "status", "dateNoticed", "dateFixed", "contactLoggerList"};

            csvWriter.writeHeader(csvHeader);

            for (MangelEntity mangelEntity : mangelEntityList) {
                csvWriter.write(mangelEntity, nameMapping);
            }

            csvWriter.close();
        } catch (IOException e){
            throw new CSVException(e.getMessage());
        }

    }
}
