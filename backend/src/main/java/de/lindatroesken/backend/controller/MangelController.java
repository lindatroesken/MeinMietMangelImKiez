package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.ContactLogger;
import de.lindatroesken.backend.api.Mangel;
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

import java.util.List;

import static de.lindatroesken.backend.controller.MangelController.CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.SC_NO_CONTENT;
import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = CONTROLLER_TAG, description = "Provides authorization methods, to get a token")
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

    @GetMapping(value = "all/{username}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only view own mangel overview")
    })
    public ResponseEntity<List<Mangel>> findAllByUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username){
        if(authUser.getUsername().equals(username) || authUser.getRole().equals("admin")){
            List<MangelEntity> mangelEntityList = mangelService.findAllForUser(username);
            return ok(mapMangel(mangelEntityList));
        }
        throw new UnauthorizedUserException("Only admins can view a list of mangel and user can only view own mangel overview");
    }

    @GetMapping(value = "one/{id}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only view own mangel overview")
    })
    public ResponseEntity<Mangel> findMangelById(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long id){
        MangelEntity mangelEntity = mangelService.findMangelById(id);
        if(mangelEntity.getUserEntity().getUsername().equals(authUser.getUsername())){
            return ok(mapMangel(mangelEntity));
        }
        throw new UnauthorizedUserException("User can only view own mangel");
    }

    @PutMapping(value = "update/{id}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only view own mangel overview")
    })
    public ResponseEntity<Mangel> updateMangel(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long id, @RequestBody Mangel updateMangel){
        if(updateMangel.getId().equals(id)){
            MangelEntity changedMangelEntity = mangelService.updateMangel(id, authUser.getUsername(), mapMangel(updateMangel));
            return ok(mapMangel(changedMangelEntity));
        }
        throw new IllegalArgumentException("Mangel and ID does not belong together");
    }

    @PostMapping(value = "new/{username}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only create a mangel for own user")
    })
    public ResponseEntity<Mangel> createNewMangelWithContactLogger(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username, @RequestBody Mangel newMangel){
        if(authUser.getUsername().equals(username)){
            MangelEntity mangelEntity = mapMangel(newMangel);
            List<ContactLoggerEntity> contactLoggerEntityList = mapContactLoggerListToEntity(newMangel.getContactLoggerList());
            MangelEntity mangelEntityCreated = mangelService.createMangelWithContactLoggerList(username, mangelEntity, contactLoggerEntityList);
            return ok(mapMangel(mangelEntityCreated));
        }
        throw new UnauthorizedUserException("Only logged in user can create a mangel in own list");
    }

    @PostMapping(value = "add/{mangelId}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only edit a mangel for own user")
    })
    public ResponseEntity<Mangel> addContactLogToMangel(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long mangelId, @RequestBody ContactLogger contactLogger){
        MangelEntity updatedMangel = mangelService.addContactLoggerToList(mangelId, authUser.getUsername(), mapContactLogger(contactLogger));
        return ok(mapMangel(updatedMangel));
    }


}
