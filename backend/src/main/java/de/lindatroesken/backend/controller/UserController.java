package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.User;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import static de.lindatroesken.backend.controller.UserController.CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.SC_NO_CONTENT;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = CONTROLLER_TAG, description = "Provides CRUD operations for an User")
@Api(tags = CONTROLLER_TAG)
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    public static final String CONTROLLER_TAG = "User Controller";
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No users found")
    })
    public ResponseEntity<List<User>> findAll(){
        List<UserEntity> userEntityList = userService.findAll();

        if(userEntityList.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(map(userEntityList));
    }

    @GetMapping(value = "{username}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found")
    })
    public ResponseEntity<User> findUser(@PathVariable String username){
        Optional<UserEntity> userEntityOptional = userService.findByUsername(username);

        if(userEntityOptional.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(map(userEntityOptional.get()));
    }


    private List<User> map(List<UserEntity> userEntityList) {
        List<User> userList = new LinkedList<>();
        for(UserEntity userEntity: userEntityList){
            User user = map(userEntity);
            userList.add(user);
        }
        return userList;

    }

    private User map(UserEntity userEntity) {
        return User.builder()
                .username(userEntity.getUsername())
                .build();
    }
}
