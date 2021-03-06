package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.*;
import de.lindatroesken.backend.model.AddressEntity;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.service.AuthService;
import de.lindatroesken.backend.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import javassist.tools.web.BadHttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static de.lindatroesken.backend.controller.UserController.CONTROLLER_TAG;
import static javax.servlet.http.HttpServletResponse.*;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@Tag(name = CONTROLLER_TAG, description = "Provides CRUD operations for an User")
@Api(tags = CONTROLLER_TAG)
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController extends ControllerMapper{

    public static final String CONTROLLER_TAG = "User Controller";
    private final UserService userService;
    private final AuthService authService;

    @Autowired
    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }


    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No users found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "Only logged in user with role 'admin' can view all user")
    })
    public ResponseEntity<List<User>> findAll(@AuthenticationPrincipal UserEntity authUser){
        if (!authUser.getRole().equals("admin")) {
            throw new UnauthorizedUserException("Only admins are allowed to view all user");
        }
        List<UserEntity> userEntityList = userService.findAll();

        if(userEntityList.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ok(mapUser(userEntityList));
    }

    @GetMapping(value = "{username}", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "Only logged in user with role 'admin' can view any user")
    })
    public ResponseEntity<User> findUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username){
        if (authUser.getUsername().equals(username) || authUser.getRole().equals("admin")) {
            UserEntity userEntity = userService.findByUsername(username);
            return ok(mapUser(userEntity));
        }
        throw new UnauthorizedUserException("Only admins are allowed to find any user");
    }

    @PostMapping(value = "register", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_BAD_REQUEST, message = "Unable to create User with blank name"),
            @ApiResponse(code = SC_CONFLICT, message = "Unable to create User, user already exists")
    })
    public ResponseEntity<User> register(@RequestBody UserRegister user) {

        UserEntity createdUser = userService.createUser(mapUser(user), user.getPassword());
        return ok(mapUser(createdUser));
    }

    @DeleteMapping(value = "{username}/delete", produces = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_NO_CONTENT, message = "No user found for request"),
            @ApiResponse(code = SC_UNAUTHORIZED, message = "User can only delete own account")
    })
    public ResponseEntity<User> deleteUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username){
        if(authUser.getUsername().equals(username) || authUser.getRole().equalsIgnoreCase("admin")){
            UserEntity deletedUser = userService.deleteUser(username);
            return ok(mapUser(deletedUser));
        }
        throw new UnauthorizedUserException("User can only delete own account or must be admin");
    }

    @PutMapping(value="username/edit", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_CONFLICT, message = "New username already exists")
    })
    public ResponseEntity<User> editUsername(@AuthenticationPrincipal UserEntity authUser, @RequestBody User user){
        UserEntity updatedUser = userService.editUsername(authUser.getUsername(), user.getUsername());
        return ok(mapUser(updatedUser));
    }

    @PutMapping(value="email/edit", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = SC_CONFLICT, message = "New username already exists")
    })
    public ResponseEntity<User> editEmail(@AuthenticationPrincipal UserEntity authUser, @RequestBody User user){
        UserEntity updatedUser = userService.editEmail(authUser.getUsername(), user.getEmail());
        return ok(mapUser(updatedUser));
    }

    @PutMapping(value="updatePassword", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
        public ResponseEntity<User> updatePassword(@AuthenticationPrincipal UserEntity authUser, @RequestBody Password password){
        authService.checkPassword(password.getPassword());
        authService.validateCredentials(authUser.getUsername(), password.getOldPassword());
        UserEntity updatedUserEntity = userService.updatePassword(authUser.getUsername(), password.getPassword());
        return ok(mapUser(updatedUserEntity));
    }

    @GetMapping(value="address/find/{username}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Address>> findAllAddressesForUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username){
        if(!authUser.getUsername().equals(username)){
            throw new UnauthorizedUserException("User can only view own addresses");
        }
        List<AddressEntity> addressEntityList = userService.findAddressByUsername(username);
        return ok(mapAddressListFromEntity(addressEntityList));
    }

    @GetMapping(value="address/find/{username}/{addressId}", produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Address> findAddressByIdForUser(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long addressId){
        AddressEntity addressEntity = userService.findAddressById(addressId);
        if(!authUser.getUsername().equals(addressEntity.getUserEntity().getUsername())){
            throw new UnauthorizedUserException("User can only view own addresses");
        }
        return ok(mapAddress(addressEntity));
    }



    @PostMapping(value = "address/new/{username}", produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Address> addNewAddress(@AuthenticationPrincipal UserEntity authUser, @PathVariable String username, @RequestBody Address address){
        if (!authUser.getUsername().equals(username)){
            throw new UnauthorizedUserException("User can only add address to own account");
        }
        AddressEntity addressEntity = userService.addNewAddress(username, mapAddress(address));

        return ok(mapAddress(addressEntity));
    }

    @PutMapping(value = "address/edit/{addressId}",produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<Address> editAddress(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long addressId, @RequestBody Address address){
        AddressEntity addressEntity = userService.editAddress(authUser.getUsername(), addressId, mapAddress(address));
        return ok(mapAddress(addressEntity));
    }

    @DeleteMapping(value = "address/delete/{addressId}",produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<Address> deleteAddress(@AuthenticationPrincipal UserEntity authUser, @PathVariable Long addressId){
        AddressEntity addressEntity = userService.deleteAddress(authUser.getUsername(), addressId);
        return ok(mapAddress(addressEntity));
    }

}
