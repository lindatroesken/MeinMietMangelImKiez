package de.lindatroesken.backend.controller;

import de.lindatroesken.backend.api.User;
import de.lindatroesken.backend.model.UserEntity;
import de.lindatroesken.backend.service.UserService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> findAll(){
        List<UserEntity> userEntityList = userService.findAll();

        if(userEntityList.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(map(userEntityList));
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
                .username(userEntity.getUsername()).build();
    }
}
