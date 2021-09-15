package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.Mangel;
import de.lindatroesken.backend.model.MangelEntity;
import de.lindatroesken.backend.model.Status;
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

import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

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
public class MangelController {
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
            return ok(map(mangelEntityList));
        }

        throw new UnauthorizedUserException("Only admins can view a list of mangel and user can only view own mangel overview");
    }

    @GetMapping(value = "{id}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only view own mangel overview")
    })
    public ResponseEntity<Mangel> findMangelById(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long id){
        MangelEntity mangelEntity = mangelService.findMangelById(id);
        return ok(map(mangelEntity));
    }

    @PostMapping(value = "{username}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "A user with role 'user' can only create a mangel for own user")
    })
    public ResponseEntity<Mangel> createNewMangel(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username, @RequestBody Mangel newMangel){
        if(authUser.getUsername().equals(username)){
            MangelEntity mangelEntityCreated = mangelService.createMangel(username, map(newMangel));
            return ok(map(mangelEntityCreated));
        }
        throw new UnauthorizedUserException("Only logged in user can create a mangel in own list");
    }

    private List<Mangel> map(List<MangelEntity> mangelEntityList) {
        List<Mangel> mangelList = new LinkedList<>();
        for (MangelEntity mangelEntity : mangelEntityList){
            Mangel mangel = map(mangelEntity);
            mangelList.add(mangel);
        }
        return mangelList;

    }

    private MangelEntity map(Mangel mangel){
        return MangelEntity.builder()
                .description(mangel.getDescription())
                .category(mangel.getCategory())
                .status(Status.valueOf(mangel.getStatus()))
                .dateNoticed(ZonedDateTime.parse(mangel.getDateNoticed()))
                .build();
    }
    private Mangel map(MangelEntity mangelEntity) {
        return Mangel.builder()
                .dateNoticed(mangelEntity.getDateNoticed().toString())
                .description(mangelEntity.getDescription())
                .category(mangelEntity.getCategory())
                .status(mangelEntity.getStatus().toString())
                .id(mangelEntity.getId())
                .build();
    }

}
